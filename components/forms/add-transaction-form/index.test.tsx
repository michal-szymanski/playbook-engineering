import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTransactionForm from '@/components/forms/add-transaction-form/index';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionsContext } from '@/contexts';

describe('<AddTransactionForm/>', () => {
    test('Required elements exist on the page', () => {
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

        const user = userEvent.setup();
        const titleLabel = screen.getByText('Title of transaction');
        const titleInput = screen.getByLabelText('Title of transaction', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        expect(titleInput).toHaveAttribute('aria-invalid', 'false');
        expect(titleLabel).not.toHaveClass('text-destructive');

        await user.type(titleInput, 'test');
        await user.click(submitButton);

        const validationError = screen.getByText('Title should have at least 5 characters');

        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
        expect(titleLabel).toHaveClass('text-destructive');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');

        await user.type(titleInput, '2');

        expect(titleInput).toHaveAttribute('aria-invalid', 'false');
        expect(titleLabel).not.toHaveClass('text-destructive');
    });

    test('Amount input requires a value', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <AddTransactionForm />
            </TransactionsContext.Provider>
        );

        const user = userEvent.setup();
        const amountLabel = screen.getByText('Amount (in PLN)');
        const amountInput = screen.getByLabelText('Amount (in PLN)', { selector: 'input' });
        const submitButton = screen.getByText('Add');

        expect(amountInput).toHaveAttribute('aria-invalid', 'false');
        expect(amountLabel).not.toHaveClass('text-destructive');

        await user.click(submitButton);

        const validationError = screen.getByText('Value is required');

        expect(amountInput).toHaveAttribute('aria-invalid', 'true');
        expect(amountLabel).toHaveClass('text-destructive');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');

        await user.type(amountInput, 'a-!@#$%^&*()+_,.<>');

        expect(amountInput).toHaveValue('');

        await user.type(amountInput, '1.23');

        expect(amountInput).toHaveAttribute('aria-invalid', 'false');
        expect(amountLabel).not.toHaveClass('text-destructive');
    });
});
