'use server';

import { auth, signOut, signIn } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';
import { client } from '@/sanity/lib/client';


export const signOutAction = async ()=> {
    'use server'
    signOut()
};

export const createPitch = async (state: any, form: FormData) => {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        });
    }

    const { title, description, category, link, pitch } = Object.fromEntries(Array.from(form));

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        // const author = session?.id || session?.user?.email
        let authorRef;

        if (session?.id) {
            authorRef = {
                _type: 'reference',
                _ref: session.id
            };
        } else if (session?.user?.email) {
            const userDocument = await client.fetch(`*[_type == "author" && email == $email][0]._id`, { email: session.user.email });
            authorRef = {
                _type: 'reference',
                _ref: userDocument
            };
        }
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: authorRef,
            pitch
        };
        const result = await writeClient.create({ _type: 'startup', ...startup });
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        });
    } catch (error) {
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
};
