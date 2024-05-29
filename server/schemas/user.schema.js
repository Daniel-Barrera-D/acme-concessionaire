import { z } from 'zod'

export const registerSchema = z.object({
    dni: z.string({
        required_error: 'DNI is required'
    }).min(8, {
        message: 'DNI must be at least 8 characters'
    }).max(10, {
        message: 'DNI must be at max 10 characters'
    }),
    name: z.string({
        required_error: 'Name is required'
    }).min(3, {
        message: 'Name must be at least 3 characters'
    }),
    lastname: z.string({
        required_error: 'Lastname is required'
    }).min(3, {
        message: 'Lastname must be at least 3 characters'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Email is not valid",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
});