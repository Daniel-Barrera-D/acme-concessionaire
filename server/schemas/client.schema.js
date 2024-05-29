import { z } from 'zod'

export const registerClientSchema = z.object({
    dni: z.string({
        required_error: 'DNI is required'
    }).min(8, {
        message: 'DNI must be at least 8 characters'
    }).max(10, {
        message: 'DNI must be at max 10 characters'
    }),
    name: z.string({
        required_error: 'Name is required'
    }),
    lastname: z.string({
        required_error: 'Lastname is required'
    }),
})