import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';
import { ChangeEvent } from 'react';
import { validateCurrencyInput } from '@/validators';

const formSchema = z.object({
    conversionRate: z.string().min(1, { message: 'Value required' })
});

const SetConversionRateForm = () => {
    const { conversionRate, setConversionRate } = useTransactionsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            conversionRate: conversionRate.toString()
        },
        mode: 'onChange'
    });

    const handleChangeConversionRate = (e: ChangeEvent<HTMLInputElement>, callback: (e: ChangeEvent<HTMLInputElement>) => void) => {
        try {
            const { value } = e.target;

            if (value) {
                validateCurrencyInput(value, 3);
            }

            setConversionRate(Number(value));
            callback(e);
        } catch {
            e.preventDefault();
        }
    };

    const handleBlurConversionRate = (e: ChangeEvent<HTMLInputElement>, callback: () => void) => {
        const { value } = e.target;

        if (value.endsWith('.')) {
            form.setValue('conversionRate', `${value}0`);
        }

        callback();
    };

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="conversionRate"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-5">
                            <FormLabel className="text-lg">1 EUR =</FormLabel>
                            <div>
                                <FormControl className="w-32">
                                    <Input
                                        {...field}
                                        onChange={(e) => handleChangeConversionRate(e, field.onChange)}
                                        onBlur={(e) => handleBlurConversionRate(e, field.onBlur)}
                                    />
                                </FormControl>
                                <div className="h-5 py-2">
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default observer(SetConversionRateForm);
