import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from './Logout';

const Navbar = async () => {
    const session = await auth();
    console.log('nav bar: ', session && JSON.stringify(session.user))
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
                            <LogoutButton />
                            <Link href={`/user/${session?.id || session?.user?.id}`}>
                                <span>{session?.user?.email}</span>
                            </Link>
                        </>
                    ) : (
                        <Link href={`/login`}>
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
