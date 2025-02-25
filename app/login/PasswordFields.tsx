'use client';

import { useEffect, useState } from 'react';

interface PasswordFieldsProps {
    isRegistering: boolean;
    onValidityChange: (isValid: boolean) => void;
}

export function PasswordFields({ isRegistering, onValidityChange }: PasswordFieldsProps) {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const isPasswordMatch = !isRegistering || password === repeatPassword;

    useEffect(() => {
        onValidityChange(isPasswordMatch);
    }, [password, repeatPassword, isRegistering, onValidityChange]);

    return (
        <>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 rounded-[30px] border border-gray-300"
            />
            {isRegistering && (
                <input
                    type="password"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat Password"
                    className="w-full p-2 rounded-[30px] border border-gray-300"
                />
            )}
            {!isPasswordMatch && isRegistering && <p className="text-red-500 text-sm">Passwords do not match</p>}
        </>
    );
}
