import { useContext } from 'react';
import { TransactionContext } from '@/contexts';

export const useTransactionsStore = () => {
    const transactionsStore = useContext(TransactionContext);

    if (!transactionsStore) throw new Error('Transactions Store is not available');

    return transactionsStore;
};
