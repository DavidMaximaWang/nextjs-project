'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SessionSync() {
    const router = useRouter();

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'logout') {
                router.push('/login');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [router]);

    return null;
}
