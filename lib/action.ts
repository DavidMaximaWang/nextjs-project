'use server';

import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';

export const createPitch = async (state: any, form: FormData) => {
    const session = await auth();

    if (!session)
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        });

        console.log('session:   ',JSON.stringify(session))
    const { title, description, category, link, pitch } = Object.fromEntries(Array.from(form));

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
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
