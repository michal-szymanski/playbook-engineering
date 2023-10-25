import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';

const TransactionsTable = () => {
    const { transactions, conversionRate, removeTransaction } = useTransactionsStore();

    const columns: ColumnDef<Transaction>[] = [
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

    const totalPLN = transactions.reduce((acc, curr) => acc + curr.amountPLN, 0);

    return (
        <div className="flex flex-col gap-5">
            <DataTable columns={columns} data={transactions} />
            <span className="text-lg">
                Sum: {totalPLN} PLN ({(totalPLN * conversionRate).toFixed(2)} EUR)
            </span>
        </div>
    );
};

export default observer(TransactionsTable);
