import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { transactionSchema } from '@/types';
import { Button } from '@/components/ui/button';

const TransactionsTable = () => {
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
            cell: ({ row: { original: transaction } }) => <div className="text-left">{transaction.amountEUR}</div>
        },
        {
            id: 'options',
            header: () => <div className="text-center">Options</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="text-center">
                    <Button type="button" onClick={() => console.log({ transaction })}>
                        Delete
                    </Button>
                </div>
            )
        }
    ];
    return <DataTable columns={columns} data={[]} />;
};

export default TransactionsTable;
