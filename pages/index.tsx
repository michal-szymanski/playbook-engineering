import Image from 'next/image';
import { Inter } from 'next/font/google';
import AddTransactionForm from '@/components/forms/add-transaction-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="container">
                <h1 className="pb-10 text-4xl font-bold">List of expenses</h1>
                <AddTransactionForm />
            </div>
        </main>
    );
}
