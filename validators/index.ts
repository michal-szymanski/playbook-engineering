import { z } from 'zod';

export const validateCurrencyInput = (value: string, scale: number) => {
    z.string()
        .min(1)
        .refine((value) => value !== 'Infinity')
        .parse(value);

    const [beforeDot, afterDot] = z.array(z.string()).min(0).max(2).parse(value.split('.'));
    const zeros = [...beforeDot].filter((c) => c === '0');

    z.number().max(1).parse(zeros.length);

    if (afterDot) {
        z.string().max(scale).parse(afterDot);
    }

    z.coerce.number().nonnegative().parse(value);
};
