import { z } from 'zod';

export const transactionSchema = z.object({
    title: z.string().min(5).max(50),
    amountPLN: z.number().min(0.01),
    amountEUR: z.number().min(0.01)
});
