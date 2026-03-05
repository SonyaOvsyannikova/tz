import ButtonIcon from "@/shared/ui/ButtonIcon";
import cl from './TableHeader.module.scss'
import Add from '@/assets/icons/add.svg?react'
import ArrowsClockwise from '@/assets/icons/arrowsClockwise.svg?react'
import {useState} from "react";
import NewProduct from "@/shared/ui/NewProduct";


const TableHeader = () => {

    const [openCreateProduct, setOpenCreateProduct] = useState<boolean>(false)
    console.log(openCreateProduct)

    return (
        <div
            className={cl.tableHeader}>
            <h3 className={cl.tableHeaderTitle}>Все позиции</h3>
            <div className={cl.tableHeaderButtons}>
                <ButtonIcon
                    className={cl.refreshButton}
                    label={<ArrowsClockwise className={cl.refreshIcon} />} />
                <button className={cl.headerButton} onClick={() => {
                    setOpenCreateProduct(true)
                    console.log( openCreateProduct)
                }}>
                    <div className={cl.addButton}>
                        <Add />
                        <p className={cl.addButtonDesc}>Добавить</p>
                    </div>
                </button>
            </div>
            {openCreateProduct && (
                <NewProduct

                    onClose={() => setOpenCreateProduct(false)} />
            )}
        </div>
    );
};

export default TableHeader;