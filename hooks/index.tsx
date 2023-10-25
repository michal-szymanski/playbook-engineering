import { useContext } from 'react';
import { TransactionsContext } from '@/contexts';

export const useTransactionsStore = () => {
    const transactionsStore = useContext(TransactionsContext);

    if (!transactionsStore) throw new Error('Transactions Store is not available');

    return transactionsStore;
};
