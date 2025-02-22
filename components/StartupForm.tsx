'use client';

import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z} from 'zod'
import { createPitch } from '@/lib/action';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch: formData.get("pitch") as string
            }
            await formSchema.parseAsync(formValues);
            const result = await createPitch(prevState, formData)
            console.log(result)
        } catch(e) {

            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>)
                return {...prevState, error: 'Validation failed', status: 'ERROR'}
            }

            return {...prevState, error: 'Unexpected errors', status: 'ERROR'}
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL'
    });

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea id="description" name="description"
                 className="startup-form_textarea" required placeholder="Startup Description" />

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category (Tech, Health, Education...)" />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL" />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>

                <Textarea id="pitch" name="pitch" style={{ borderRadius: 20, overflow: 'hidden' }} />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Your Pitch'}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;
