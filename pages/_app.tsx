import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionsContext } from '@/contexts';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TransactionsContext.Provider value={new TransactionsStore()}>
            <Component {...pageProps} />
        </TransactionsContext.Provider>
    );
}
