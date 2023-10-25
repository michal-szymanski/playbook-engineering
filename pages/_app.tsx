import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionContext } from '@/contexts';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TransactionContext.Provider value={new TransactionsStore()}>
            <Component {...pageProps} />
        </TransactionContext.Provider>
    );
}
