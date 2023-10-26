import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionsContext } from '@/contexts';
import SetConversionRateForm from '@/components/forms/set-conversion-rate-form/index';
import userEvent from '@testing-library/user-event';

describe('<SetConversionRateForm/>', () => {
    test('Required elements exist on the page', () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <SetConversionRateForm />
            </TransactionsContext.Provider>
        );

        const label = screen.getByText('1 EUR =');
        const input = screen.getByLabelText('1 EUR =', { selector: 'input' });

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    test('Input has default value', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <SetConversionRateForm />
            </TransactionsContext.Provider>
        );

        const input = screen.getByLabelText('1 EUR =', { selector: 'input' });

        const defaultValue = (4.382).toString();

        expect(input).toHaveValue(defaultValue);
    });

    test('Input requires a value', async () => {
        render(
            <TransactionsContext.Provider value={new TransactionsStore()}>
                <SetConversionRateForm />
            </TransactionsContext.Provider>
        );

        const user = userEvent.setup();
        const label = screen.getByText('1 EUR =');
        const input = screen.getByLabelText('1 EUR =', { selector: 'input' });

        expect(input).toHaveAttribute('aria-invalid', 'false');
        expect(label).not.toHaveClass('text-destructive');

        await user.clear(input);
        const validationError = screen.getByText('Value is required');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(label).toHaveClass('text-destructive');
        expect(validationError).toBeInTheDocument();
        expect(validationError).toHaveClass('text-destructive');

        await user.type(input, 'a-!@#$%^&*()+_,.<>');

        expect(input).toHaveValue('');

        await user.type(input, '1.23');

        expect(input).toHaveAttribute('aria-invalid', 'false');
        expect(label).not.toHaveClass('text-destructive');
        expect(validationError).not.toBeInTheDocument();
    });
});
