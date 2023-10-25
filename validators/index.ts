import { z } from 'zod';

export const validateCurrencyInput = (value: string, scale: number) => {
    const groups = z.array(z.string()).min(0).max(2).parse(value.split('.'));

    if (groups.length === 2) {
        z.string().max(scale).parse(groups[1]);
    }

    z.coerce.number().positive().parse(value);
};
