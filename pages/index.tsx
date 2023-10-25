import { Inter } from 'next/font/google';
import AddTransactionForm from '@/components/forms/add-transaction-form';
import TransactionsTable from '@/components/tables/transactions-table';
import SetConversionRateForm from '@/components/forms/set-conversion-rate-form';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Playground Engineering</title>
            </Head>
            <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
                <div className="container flex flex-col gap-20">
                    <div className="flex items-center justify-between pb-10">
                        <h1 className=" text-4xl font-bold">List of expenses</h1>
                        <SetConversionRateForm />
                    </div>
                    <AddTransactionForm />
                    <TransactionsTable />
                </div>
            </main>
        </>
    );
}
