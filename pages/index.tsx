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
            <main className={`flex min-h-screen flex-col items-center justify-between py-20 ${inter.className}`}>
                <div className="container flex flex-col gap-5 lg:gap-20">
                    <div className="flex flex-col justify-between gap-5 pb-10 lg:flex-row lg:items-center">
                        <h1 className="text-4xl font-bold">List of expenses</h1>
                        <div className="flex items-center gap-2">
                            <SetConversionRateForm />
                            <span className="pb-2.5 text-lg font-medium">PLN</span>
                        </div>
                    </div>
                    <AddTransactionForm />
                    <TransactionsTable />
                </div>
            </main>
        </>
    );
}
