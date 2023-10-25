import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';
import { v4 as uuidV4 } from 'uuid';
import { ChangeEvent } from 'react';

const formSchema = z.object({
    title: z.string().min(5, { message: 'Title should have at least 5 characters' }).max(50, { message: "Title shouldn't be longer that 50 characters" }),
    amountPLN: z.string().min(1, { message: 'Amount is required' })
});

const AddTransactionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            amountPLN: ''
        }
    });

    const { addTransaction } = useTransactionsStore();

    const onSubmit = async ({ title, amountPLN }: z.infer<typeof formSchema>) => {
        addTransaction({ id: uuidV4(), title, amountPLN: Number(amountPLN) });
        form.reset();
    };

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>, callback: (e: ChangeEvent<HTMLInputElement>) => void) => {
        try {
            const { value } = e.target;

            if (value) {
                const groups = z.array(z.string()).min(0).max(2).parse(value.split('.'));

                if (groups.length === 2) {
                    z.string().max(2).parse(groups[1]);
                }

                z.coerce.number().parse(value);
            }
            callback(e);
        } catch {
            e.preventDefault();
        }
    };

    const handleBlurAmount = (e: ChangeEvent<HTMLInputElement>, callback: () => void) => {
        const { value } = e.target;

        if (value.endsWith('.')) {
            form.setValue('amountPLN', `${value}0`);
        }

        callback();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-5">
                            <FormLabel className="w-44 whitespace-nowrap text-lg">Title of transaction</FormLabel>
                            <div>
                                <FormControl className="w-96">
                                    <Input {...field} />
                                </FormControl>
                                <div className="h-5 py-2">
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="amountPLN"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-5">
                                <FormLabel className="w-44 whitespace-nowrap text-lg">Amount (in PLN)</FormLabel>
                                <div>
                                    <FormControl className="w-96">
                                        <Input
                                            {...field}
                                            onChange={(e) => handleChangeAmount(e, field.onChange)}
                                            onBlur={(e) => handleBlurAmount(e, field.onBlur)}
                                        />
                                    </FormControl>
                                    <div className="h-5 py-2">
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-36">
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default observer(AddTransactionForm);
