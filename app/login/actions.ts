'use server';

import { signIn } from '@/auth';

export const signInWithGithub = async () => {
    await signIn('github');
};
export const signInAction = async (prevState: any, formData: FormData) => {
    let result = {
        status: true,
        errors: [] as string[]
    };

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const repeatPassword = formData.get('repeatPassword') as string;

    if (repeatPassword && password !== repeatPassword) {
        result.status = false;
        result.errors.push('Passwords do not match.');
        return result;
    }

    try {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
            action: Boolean(repeatPassword)? 'register' : 'login'
        });

        if (res?.error) {
            result.status = false;
            result.errors.push(res.error);
            return result;
        }
    } catch (error) {
        result.status = false;
        result.errors.push('Username and password does not match or user does not exist!');
    }

    return result;
};
