import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionsStore from '@/stores/domain-stores/transactions-store';
import { TransactionsContext } from '@/contexts';
import SetConversionRateForm from '@/components/forms/set-conversion-rate-form/index';

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
});
