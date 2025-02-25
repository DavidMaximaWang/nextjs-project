'use client';
import { signOut } from "next-auth/react";

export function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
            Logout
        </button>
    );
}