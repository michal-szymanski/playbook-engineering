import { DataTable } from '@/components/ui/data-table';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';
import { ArrowUpDown } from 'lucide-react';

const TransactionsTable = () => {
    const { transactions, conversionRate, removeTransaction } = useTransactionsStore();

    const renderSortingButton = (column: Column<Transaction>, text: string) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {text}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );

    const columns: ColumnDef<Transaction>[] = [
        {
            id: 'title',
            accessorKey: 'title',
            header: ({ column }) => renderSortingButton(column, 'Title'),
            cell: ({ row: { original: transaction } }) => <div className="pl-4 text-left">{transaction.title}</div>
        },
        {
            id: 'amountPLN',
            accessorKey: 'amountPLN',
            header: ({ column }) => renderSortingButton(column, 'Amount (PLN)'),
            cell: ({ row: { original: transaction } }) => <div className="pl-4 text-left">{transaction.amountPLN.toFixed(2)}</div>
        },
        {
            id: 'amountEUR',
            header: () => <div className="text-left">Amount (EUR)</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="pl-4 text-left">{conversionRate ? (transaction.amountPLN * conversionRate).toFixed(2) : 'n/a'}</div>
            )
        },
        {
            id: 'options',
            header: () => <div className="text-center">Options</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="text-center">
                    <Button type="button" variant="link" onClick={() => removeTransaction(transaction.id)}>
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    const totalPLN = transactions.reduce((acc, curr) => acc + curr.amountPLN, 0);
    const totalEUR = conversionRate ? `(${(totalPLN * conversionRate).toFixed(2)} EUR)` : null;

    return (
        <div className="flex flex-col gap-5">
            <DataTable columns={columns} data={transactions} />
            <span className="text-lg">
                Sum: {totalPLN.toFixed(2)} PLN {totalEUR}
            </span>
        </div>
    );
};

export default observer(TransactionsTable);
