import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {
    const session = await auth();
    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30}></Image>
                </Link>
                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span> Create</span>
                            </Link>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({redirectTo: "/"});
                                }}
                            >
                                <button type="submit"> Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                'use server';
                                await signIn('github');
                            }}
                        >
                            <button type="submit">login</button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
