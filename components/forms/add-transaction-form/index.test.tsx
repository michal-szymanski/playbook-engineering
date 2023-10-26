import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTransactionForm from '@/components/forms/add-transaction-form/index';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionsContext } from '@/contexts';
describe('<AddTransactionForm/>', () => {
    test('Required elements exist on the page', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <AddTransactionForm />
            </TransactionsContext.Provider>
        );

        const titleInput = screen.getByLabelText('Title of transaction', { selector: 'input' });
        const amountInput = screen.getByLabelText('Amount (in PLN)', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        expect(titleInput).toBeInTheDocument();
        expect(amountInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('type', 'submit');
    });

    test('Title input requires at least 5 characters', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <AddTransactionForm />
            </TransactionsContext.Provider>
        );

        const titleLabel = screen.getByText('Title of transaction');
        const titleInput = screen.getByLabelText('Title of transaction', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        await userEvent.click(titleInput);
        await userEvent.type(titleInput, 'test');
        await userEvent.click(submitButton);

        const validationError = screen.getByText('Title should have at least 5 characters');

        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');
        expect(titleLabel).toHaveClass('text-destructive');

        await userEvent.type(titleInput, '2');
        await userEvent.click(submitButton);

        expect(titleInput).toHaveAttribute('aria-invalid', 'false');
        expect(titleLabel).not.toHaveClass('text-destructive');
    });
});
