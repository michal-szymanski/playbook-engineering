import { createContext } from 'react';
import TransactionsStore from '@/stores/domain-stores/transactions-store';

export const TransactionContext = createContext<InstanceType<typeof TransactionsStore> | null>(null);
