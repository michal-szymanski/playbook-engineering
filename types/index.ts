import { z } from 'zod';

export const transactionSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(5).max(50),
    amountPLN: z.number().min(0.01),
    amountEUR: z.number().min(0.01)
});

export type Transaction = z.infer<typeof transactionSchema>;
