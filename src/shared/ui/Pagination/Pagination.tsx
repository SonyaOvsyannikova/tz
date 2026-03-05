import ButtonIcon from "@/shared/ui/ButtonIcon";
import Prev from '@/assets/icons/prev.svg?react'
import Next from '@/assets/icons/next.svg?react'
import type { Products } from "@/store/useProductStore.ts";
import type { Table } from "@tanstack/react-table";
import cl from './Pagination.module.scss'

type PaginationProps = {
    table: Table<Products>
}
const Pagination = (props: PaginationProps) => {

    const {
        table
    } = props;

    const currentIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()

    const isActivePage = (pageIndex: number) => currentIndex === pageIndex

    return(
        <div className={cl.pagination}>
            <div style={{display: "flex", columnGap: '5px'}}>
                <p style={{color: '#B2B3B9'}}>Показано </p>
                <p style={{color: 'black'}}>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                )} </p>
                <p style={{color: '#B2B3B9'}}>из </p>
                <p style={{color: 'black'}}> {table.getFilteredRowModel().rows.length}</p>
            </div>
            <div className={cl.navigation}>
                <ButtonIcon
                    className={cl.prevButton}
                    label={<Prev />}
                    onClick={() => table.previousPage()}/>
                <div className={cl.paginationButtons}>
                    {Array.from({ length: pageCount }, (_, i) => i).map((pageIndex: number) => (
                        <button
                            className={`${cl.paginationButton} ${isActivePage(pageIndex) ? cl.active : ''}`}
                            key={pageIndex}
                            onClick={() => table.setPageIndex(pageIndex)}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}
                </div>
                <ButtonIcon
                    className={cl.nextButton}
                    label={<Next />}
                    onClick={() =>  table.nextPage()} />
            </div>
        </div>
    )
};

export default Pagination;