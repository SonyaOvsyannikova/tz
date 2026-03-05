import TableHeader from "@/shared/ui/TableHeader/TableHeader.tsx";
import cl from './Product.module.scss'
import ProductTable from "@/shared/ui/ProductTable";
import Pagination from "@/shared/ui/Pagination";
import {useReactTable, getCoreRowModel, getPaginationRowModel, type ColumnDef} from "@tanstack/react-table";
import {useProductStore} from "@/store/useProductStore.ts";
import type { Products } from '@/store/useProductStore'


const Product = () => {
    const { products, isLoading, error } = useProductStore()

    const columns: ColumnDef<Products>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <input
                    className={cl.checkBox}
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row  }) => (
                <input
                    className={cl.checkBox}
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            )
        },
        {
            accessorKey: 'title',
            header: 'Наименование',
            cell: ({ row }) => (
                <div className={cl.titleCell}>
                    <span className={cl.square}></span>
                    <div>
                        <p className={cl.productTitle}>{row.original.title}</p>
                        <p>{row.original.category}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'brand',
            header: 'Вендор'
        },
        {
            accessorKey: 'sku',
            header: 'Артикул'
        },
        {
            accessorKey: 'rating',
            header: 'Оценка',
            cell: ({ getValue }) => `${getValue()}/5`
        },
        {
            accessorKey: 'price',
            header: 'Цена, Р'
        },
        {
            id: 'actions',
            header: '',
            cell: () => <button className={cl.addButton}></button>
        },
        {
            id: 'menu',
            header: '',
            cell: () => <button className={cl.moreButton}></button>
        }
    ]
    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    return (
        <div className={cl.productWidget}>
            <TableHeader />
            <ProductTable
                table = {table}
                columns = {columns}
                isLoading={isLoading}
                error={error}
            />
            <Pagination table={table}/>
        </div>
    );
};

export default Product;