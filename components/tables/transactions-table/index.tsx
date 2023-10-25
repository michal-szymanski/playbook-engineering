import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { transactionSchema } from '@/types';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';

const TransactionsTable = () => {
    const { transactions, conversionRate, removeTransaction } = useTransactionsStore();

    const columns: ColumnDef<z.infer<typeof transactionSchema>>[] = [
        {
            id: 'title',
            header: () => <div className="text-left">Title</div>,
            cell: ({ row: { original: transaction } }) => <div className="text-left">{transaction.title}</div>
        },
        {
            id: 'amountPLN',
            header: () => <div className="text-left">Amount (PLN)</div>,
            cell: ({ row: { original: transaction } }) => <div className="text-left">{transaction.amountPLN}</div>
        },
        {
            id: 'amountEUR',
            header: () => <div className="text-left">Amount (EUR)</div>,
            cell: ({ row: { original: transaction } }) => <div className="text-left">{(transaction.amountPLN * conversionRate).toFixed(2)}</div>
        },
        {
            id: 'options',
            header: () => <div className="text-center">Options</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="text-center">
                    <Button type="button" onClick={() => removeTransaction(transaction.id)}>
                        Delete
                    </Button>
                </div>
            )
        }
    ];
    return <DataTable columns={columns} data={transactions} />;
};

export default observer(TransactionsTable);
