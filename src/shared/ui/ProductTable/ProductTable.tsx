import type {
    ColumnDef,
    Table as ReactTableType
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import cl from './ProductTable.module.scss'
import {type Products, useProductStore} from "@/store/useProductStore.ts";

type ProductTableProps = {
    table: ReactTableType<Products>;
    columns: ColumnDef<Products>[];
    isLoading: boolean;
    error: string | null;
}
const ProductTable = (props: ProductTableProps) => {

    const { setSorting } = useProductStore()

    const {
        isLoading,
        error,
        table,
    } = props

    if (isLoading) {
       return <div>Загрузка...</div>
    }
    if (error) {
        return <div>Ошибка!</div>
    }



    return (
        <table className={cl.table}>
            <thead>
                {table.getHeaderGroups().map((hg) => (
                    <tr
                        className={table.getIsAllRowsSelected() ? cl.allSelected : ''}
                        key={hg.id}>
                        {hg.headers.map((header) => (
                            <th onClick={() => setSorting(header.id)}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr
                    className={row.getIsSelected() ? cl.selectedRow : ''}
                    key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td className={cl.tableСell}
                            key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductTable;