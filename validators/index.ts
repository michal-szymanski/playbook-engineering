import { z } from 'zod';

export const validateCurrencyInput = (value: string, precision: number) => {
    const groups = z.array(z.string()).min(0).max(2).parse(value.split('.'));

    if (groups.length === 2) {
        z.string().max(precision).parse(groups[1]);
    }

    z.coerce.number().parse(value);
};
