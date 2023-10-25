import { createContext } from 'react';
import TransactionsStore from '@/stores/domain-stores/transactions-store';

export const TransactionsContext = createContext<InstanceType<typeof TransactionsStore> | null>(null);
