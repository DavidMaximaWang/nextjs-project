import { AUTHOR_BY_EMAIL, AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import NextAuth, { Profile, User } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './lib/zod';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
                action: { label: 'Action', type: 'text' },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const { email, password, action='login' } = await signInSchema.parseAsync(credentials);


                    if (action === 'register') {

                        const existingUser = await writeClient.fetch(AUTHOR_BY_EMAIL, { email });

                        if (existingUser) {
                            throw new Error('User already exists');
                        }

                        const hashedPassword = await bcrypt.hash(password, 10);

                        const user = await writeClient.create({
                            _type: 'author',
                            email,

                            password: hashedPassword,
                        });

                        return { ...user, id: user._id };
                    }

                    // logic to verify if the user exists
                    user = await client.fetch(AUTHOR_BY_EMAIL, {
                        email
                    });

                    if (!user) {
                        throw new Error('Invalid credentials.');
                    }
                    // const hashedPassword = await bcrypt.hash(password, 10);
                    // await writeClient
                    // .patch(user._id)
                    // .set({ password: hashedPassword })
                    // .commit();

                    const isValid = await bcrypt.compare(password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return { ...user, id: user._id };

                } catch (error) {
                    if (error instanceof z.ZodError) {
                        return null;
                    }
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user: { name, email, image }, account, profile }) {
            if (account?.provider === 'github') {
                const { id, login, bio } = profile || {};

                const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id
                });

                if (!existingUser) {
                    await writeClient.withConfig({ useCdn: false }).create({
                        _type: 'author',
                        id,
                        name,
                        username: login,
                        email,
                        image,
                        bio: bio || ''
                    });
                }

                return true;
            }

            return true;
        },
        async jwt( { token, account, profile, user }) {
            if (account?.provider === 'github') {
                if (account && profile) {
                    const gitHubUser  = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                        id: profile?.id
                    });
                    token.id = gitHubUser?._id;
                }
                return token;
            } else {
                if (user) {
                    token.id = user.id;
                }
                return token;
            }

        },

        async session({ session, token }) {
            (session.user as any).id = token.id;
            return session;
        }
    }
});
