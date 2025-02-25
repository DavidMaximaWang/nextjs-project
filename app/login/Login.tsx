'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { signInAction, signInWithGithub } from './actions';

const initState = {
    status: false,
    errors: []
};

export function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const { data: session, status, update } = useSession();

    const [formData, setFormData] = useState({
        password: '',
        repeatPassword: ''
    });
    const [state, action] = useActionState(signInAction, initState);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const isPasswordMatch = () => (isRegistering ? formData.password === formData.repeatPassword : true);

    const router = useRouter();

    const switchLogin = () => {
        setIsRegistering(!isRegistering);
    };
    useEffect(() => {

        console.log(JSON.stringify(session))
        if (state.status || status === 'authenticated') {
            router.push('/');
        }
    }, [status, state.status, router]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-[30px] shadow-custom-top border-0 p-8 space-y-8">
                    <h2 className="text-2xl font-normal">{!isRegistering ? `Sign In` : `Signin`}</h2>
                    <form action={action} className="space-y-6">
                        <input type="email" name="email" placeholder="Email" className="w-full p-2 rounded-[30px] border border-gray-300" />
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full p-2 rounded-[30px] border border-gray-300" />
                        {isRegistering ? <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleInputChange} placeholder="Repeat Password" className="w-full p-2 rounded-[30px] border border-gray-300" /> : <></>}
                        {Boolean(state.errors.length) && (
                            <div className="text-red-500">
                                {state.errors.map((error, i) => {
                                    return (
                                        <ul>
                                            <li key={i}>{error}</li>
                                        </ul>
                                    );
                                })}
                            </div>
                        )}
                        <button type="submit" className={`w-full p-2 rounded-[30px] text-white ${!isPasswordMatch() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`} disabled={!isPasswordMatch()}>
                            {isRegistering ? 'Register' : 'Sign In'}
                        </button>
                    </form>

                    <button onClick={switchLogin} className="text-blue-500 underline bg-transparent border-none p-0 cursor-pointer">
                        {!isRegistering ? `Register instead` : `Login instead`}
                    </button>
                    <form action={signInWithGithub}>
                        <button type="submit" className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                                <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                            </svg>
                            Sign in with GitHub
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
