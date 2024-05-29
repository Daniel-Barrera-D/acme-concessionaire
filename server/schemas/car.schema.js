import { z } from 'zod'

export const registerCarSchema = z.object({
    numberPlate: z.string({
        required_error: 'Number plate is required'
    }).min(6, {
        message: 'Number plate must be at least 6 characters'
    }).max(6, {
        message: 'Number plate must be at max 6 characters'
    }),
    make: z.string({
        required_error: 'Make is required'
    }),
    model: z.string({
        required_error: 'Model is required'
    }),
    salePrice: z.string({
        required_error: 'Sale price is required'
    }),
    dniOwner: z.string({
        required_error: 'DNI owner is required'
    }).min(8, {
        message: 'DNI owner must be at least 8 characters'
    }).max(10, {
        message: 'DNI owner must be at max 10 characters'
    }),
})