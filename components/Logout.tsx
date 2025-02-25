'use client';
import { signOut } from "next-auth/react";

export function LogoutButton() {
    const handleLogout = async () => {
        localStorage.setItem('logout', Date.now().toString());
        await signOut({ redirectTo: '/' });
    };
    return (
        <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
            Logout
        </button>
    );
}