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

        const titleLabel = screen.getByText('Title of transaction');
        const titleInput = screen.getByLabelText('Title of transaction', { selector: 'input' });
        const amountLabel = screen.getByText('Amount (in PLN)');
        const amountInput = screen.getByLabelText('Amount (in PLN)', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        expect(titleLabel).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(amountLabel).toBeInTheDocument();
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

        await userEvent.type(titleInput, 'test');
        await userEvent.click(submitButton);

        const validationError = screen.getByText('Title should have at least 5 characters');

        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');
        expect(titleLabel).toHaveClass('text-destructive');

        await userEvent.type(titleInput, '2');

        expect(titleInput).toHaveAttribute('aria-invalid', 'false');
        expect(titleLabel).not.toHaveClass('text-destructive');
    });

    test('Amount input requires a value', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <AddTransactionForm />
            </TransactionsContext.Provider>
        );

        const amountLabel = screen.getByText('Amount (in PLN)');
        const amountInput = screen.getByLabelText('Amount (in PLN)', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        await userEvent.click(submitButton);

        const validationError = screen.getByText('Amount is required');

        expect(amountInput).toHaveAttribute('aria-invalid', 'true');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');
        expect(amountLabel).toHaveClass('text-destructive');

        await userEvent.type(amountInput, 'a-!@#$%^&*()+_,.<>');

        expect(amountInput).toHaveValue('');

        await userEvent.type(amountInput, '1.23');

        expect(amountInput).toHaveAttribute('aria-invalid', 'false');
        expect(amountLabel).not.toHaveClass('text-destructive');
    });
});
