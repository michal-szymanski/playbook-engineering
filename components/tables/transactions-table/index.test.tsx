import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TransactionsContext } from '@/contexts';
import userEvent from '@testing-library/user-event';
import TransactionsTable from '@/components/tables/transactions-table/index';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { Transaction } from '@/types';

describe('<TransactionsTable/>', () => {
    test('Empty data displays no results message', () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <TransactionsTable />
            </TransactionsContext.Provider>
        );

        const noResultsMessage = screen.getByText('No results.');

        expect(noResultsMessage).toBeInTheDocument();
    });

    test('Table displays data correctly', () => {
        const store = new TransactionsStore();
        const transaction1: Transaction = { id: '1', amountPLN: 100, title: 'transaction 1' };
        store.addTransaction(transaction1);

        render(
            <TransactionsContext.Provider value={store}>
                <TransactionsTable />
            </TransactionsContext.Provider>
        );

        const cell1 = screen.getByText(transaction1.title);
        const cell2 = screen.getByText(transaction1.amountPLN.toFixed(2));
        const cell3 = screen.getByText((transaction1.amountPLN * store.conversionRate).toFixed(2));
        const cell4 = screen.getByText('Delete');

        expect(cell1).toBeInTheDocument();
        expect(cell2).toBeInTheDocument();
        expect(cell3).toBeInTheDocument();
        expect(cell4).toBeInTheDocument();
    });

    test('User clicks delete button', async () => {
        const store = new TransactionsStore();
        const transaction1: Transaction = { id: '1', amountPLN: 100, title: 'transaction 1' };
        const transaction2: Transaction = { id: '2', amountPLN: 200, title: 'transaction 2' };

        store.addTransaction(transaction1);
        store.addTransaction(transaction2);

        render(
            <TransactionsContext.Provider value={store}>
                <TransactionsTable />
            </TransactionsContext.Provider>
        );

        const user = userEvent.setup();

        const deleteButtons = screen.queryAllByRole('button', { name: 'Delete' });
        expect(deleteButtons).toHaveLength(2);

        await user.click(deleteButtons[1]);

        const deleteButtonsAfterAction = screen.queryAllByRole('button', { name: 'Delete' });

        const cell1 = screen.getByText(transaction1.title);
        const cell2 = screen.getByText(transaction1.amountPLN.toFixed(2));
        const cell3 = screen.getByText((transaction1.amountPLN * store.conversionRate).toFixed(2));

        expect(cell1).toBeInTheDocument();
        expect(cell2).toBeInTheDocument();
        expect(cell3).toBeInTheDocument();
        expect(deleteButtonsAfterAction).toHaveLength(1);
    });

    test('User sorts data by title', async () => {
        const store = new TransactionsStore();
        const transaction1: Transaction = { id: '1', amountPLN: 200, title: 'transaction 1' };
        const transaction2: Transaction = { id: '2', amountPLN: 100, title: 'transaction 2' };

        store.addTransaction(transaction1);
        store.addTransaction(transaction2);

        render(
            <TransactionsContext.Provider value={store}>
                <TransactionsTable />
            </TransactionsContext.Provider>
        );

        const user = userEvent.setup();

        const titleButton = screen.getByRole('button', { name: 'Title' });

        const [, ...dataRows] = screen.queryAllByRole('row');
        expect(dataRows[0].children[0].children[0]).toHaveTextContent(transaction1.title);
        expect(dataRows[1].children[0].children[0]).toHaveTextContent(transaction2.title);

        await user.click(titleButton);
        await user.click(titleButton);

        const [, ...dataRowsAfterAction] = screen.queryAllByRole('row');

        expect(dataRowsAfterAction[0].children[0].children[0]).toHaveTextContent(transaction2.title);
        expect(dataRowsAfterAction[1].children[0].children[0]).toHaveTextContent(transaction1.title);
    });

    test('Sum is calculated correctly', async () => {
        const store = new TransactionsStore();
        const transaction1: Transaction = { id: '1', amountPLN: 200, title: 'transaction 1' };
        const transaction2: Transaction = { id: '2', amountPLN: 100, title: 'transaction 2' };

        store.addTransaction(transaction1);
        store.addTransaction(transaction2);

        render(
            <TransactionsContext.Provider value={store}>
                <TransactionsTable />
            </TransactionsContext.Provider>
        );

        const sum = screen.getByText('Sum:', { exact: false });
        const totalPLN = transaction1.amountPLN + transaction2.amountPLN;
        const totalEUR = totalPLN * store.conversionRate;

        expect(sum).toHaveTextContent(`Sum: ${totalPLN.toFixed(2)} PLN (${totalEUR.toFixed(2)} EUR)`);
    });
});

test('User deletes conversion rate', async () => {
    const store = new TransactionsStore();
    const transaction1: Transaction = { id: '1', amountPLN: 200, title: 'transaction 1' };
    const transaction2: Transaction = { id: '2', amountPLN: 100, title: 'transaction 2' };

    store.addTransaction(transaction1);
    store.addTransaction(transaction2);
    store.setConversionRate(0);

    render(
        <TransactionsContext.Provider value={store}>
            <TransactionsTable />
        </TransactionsContext.Provider>
    );

    const notAvailableCells = screen.getAllByText('n/a');
    const sum = screen.getByText('Sum:', { exact: false });
    const totalPLN = transaction1.amountPLN + transaction2.amountPLN;

    expect(notAvailableCells).toHaveLength(2);
    expect(sum).toHaveTextContent(`Sum: ${totalPLN.toFixed(2)} PLN`);
});
