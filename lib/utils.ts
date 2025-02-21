import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
    debugger;

    return new Date(date).toLocaleDateString(
        'en-US',

        {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }
    );
};
