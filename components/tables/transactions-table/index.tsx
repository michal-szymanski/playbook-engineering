import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { useTransactionsStore } from '@/hooks';
import { ArrowDown10, ArrowDownAz, ArrowUp10, ArrowUpAZ, ArrowUpDown, Trash2 } from 'lucide-react';
import { convertAmount } from '@/utils';

const TransactionsTable = () => {
    const { transactions, conversionRate, removeTransaction } = useTransactionsStore();

    const columns: ColumnDef<Transaction>[] = [
        {
            id: 'title',
            accessorKey: 'title',
            header: ({ column }) => {
                const isSorted = column.getIsSorted();
                return (
                    <div className="text-left">
                        <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
                            Title
                            <div className="pl-2">
                                {!isSorted ? (
                                    <ArrowUpDown className="h-5 w-5" />
                                ) : isSorted === 'asc' ? (
                                    <ArrowDownAz className="h-5 w-5" />
                                ) : (
                                    <ArrowUpAZ className="h-5 w-5" />
                                )}
                            </div>
                        </Button>
                    </div>
                );
            },
            cell: ({ row: { original: transaction } }) => <div className="pl-4 text-left">{transaction.title}</div>
        },
        {
            id: 'amountPLN',
            accessorKey: 'amountPLN',
            header: ({ column }) => {
                const isSorted = column.getIsSorted();
                return (
                    <div className="text-right">
                        <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
                            <span className="whitespace-normal">Amount (PLN)</span>
                            <div className="pl-2">
                                {!isSorted ? (
                                    <ArrowUpDown className="h-5 w-5" />
                                ) : isSorted === 'asc' ? (
                                    <ArrowDown10 className="h-5 w-5" />
                                ) : (
                                    <ArrowUp10 className="h-5 w-5" />
                                )}
                            </div>
                        </Button>
                    </div>
                );
            },
            cell: ({ row: { original: transaction } }) => <div className="pr-4 text-right">{transaction.amountPLN.toFixed(2)}</div>,
            maxSize: 300
        },
        {
            id: 'amountEUR',
            header: () => <div className="text-right">Amount (EUR)</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="text-right">{conversionRate ? convertAmount(transaction.amountPLN, conversionRate).toFixed(2) : 'n/a'}</div>
            ),
            maxSize: 300
        },
        {
            id: 'options',
            header: () => <div className="text-center">Options</div>,
            cell: ({ row: { original: transaction } }) => (
                <div className="text-center">
                    <Button
                        type="button"
                        variant="secondary"
                        className="gap-3 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTransaction(transaction.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden md:inline">Delete</span>
                    </Button>
                </div>
            ),
            maxSize: 100
        }
    ];

    const totalPLN = transactions.reduce((acc, curr) => acc + curr.amountPLN, 0);
    const totalEUR = conversionRate ? `(${convertAmount(totalPLN, conversionRate).toFixed(2)} EUR)` : null;

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
