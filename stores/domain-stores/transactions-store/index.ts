import { Transaction } from '@/types';
import { action, makeObservable, observable } from 'mobx';

class TransactionsStore {
    transactions: Transaction[] = [];

    constructor() {
        makeObservable(this, {
            transactions: observable,
            addTransaction: action.bound,
            removeTransaction: action.bound
        });
    }

    addTransaction(newTransaction: Transaction) {
        this.transactions = [...this.transactions, { ...newTransaction }];
    }

    removeTransaction(id: string) {
        this.transactions = this.transactions.filter((t) => t.id !== id);
    }
}

export default TransactionsStore;
