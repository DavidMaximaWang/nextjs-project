import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/startup', '/user'];

export async function middleware(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;

    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/startup/:path*', '/user/:path*'],
};
