import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    title: z.string().min(5, { message: 'Title should have at least 5 characters' }).max(50, { message: "Title shouldn't be longer that 50 characters" }),
    amount: z.string().min(1, { message: 'Amount is required' })
});

const AddTransactionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            amount: ''
        }
    });

    const onSubmit = async ({ title, amount }: z.infer<typeof formSchema>) => {
        console.log({ title, amount });
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
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-5">
                                <FormLabel className="w-44 whitespace-nowrap text-lg">Amount (in PLN)</FormLabel>
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
                    <Button type="submit" className="w-36">
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddTransactionForm;
