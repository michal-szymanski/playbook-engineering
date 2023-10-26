import { z } from 'zod';

export const transactionSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(5).max(50),
    amountPLN: z.number().min(0.01)
});

export type Transaction = z.infer<typeof transactionSchema>;

export const currencySchema = z.string().refine((value) => [...value].filter((c) => c !== '0' && c !== '.').length > 0, { message: 'Value is required' });
