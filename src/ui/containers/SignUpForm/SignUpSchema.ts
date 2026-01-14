import { z } from 'zod';

export const signUpSchema = z.object({
    fullname: z
    .string({message: 'required'})
    .min(5, "at least 5 letters"),
    email: z
    .email("invalid email"),
    password: z
    .string({message: 'required'})
    .min(6, "at least 6 characters"),
    confirmPassword: z
    .string({message: 'required'})
    .min(6, "at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, 
    {
        message: "passwords must be the equal",
        path: ['confirmPassword']
    })

export type SignUpSchema = z.infer<typeof signUpSchema>;
