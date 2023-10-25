import { Inter } from 'next/font/google';
import AddTransactionForm from '@/components/forms/add-transaction-form';
import TransactionsTable from '@/components/tables/transactions-table';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="container flex flex-col gap-20">
                <div className="flex items-center justify-between pb-10">
                    <h1 className=" text-4xl font-bold">List of expenses</h1>
                    <span>1 EUR = 4,382 PLN</span>
                </div>
                <AddTransactionForm />
                <TransactionsTable />
            </div>
        </main>
    );
}
