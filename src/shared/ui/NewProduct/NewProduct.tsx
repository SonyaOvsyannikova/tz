import {type ChangeEvent, type FormEvent, useState} from "react";
import cl from './NewProduct.module.scss'
import {useProductStore} from "@/store/useProductStore.ts";
import {useOutsideClick} from "@/shared/hook/useOutsideClick.ts";

type NewProductProps = {
    onClose: () => void;
}
const NewProduct = (props:NewProductProps) => {

    const { onClose } = props;

    const [value, setValue] = useState({
        title: '',
        brand: '',
        sku: '',
        price: '',
    })
    const addProduct = useProductStore((state) => state.addProduct);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value.title.trim()) {
            alert('Введите наименование товара');
            return;
        }
        if (!value.sku.trim()) {
            alert('Введите артикул');
            return;
        }
        if (!value.brand.trim()) {
            alert('Введите бренд');
            return;
        }
        if (value.price) {
            const price = parseFloat(value.price);
            if (isNaN(price) || price <= 0) {
                alert('Цена должна быть положительным числом');
                return;
            }
        }
        const productData = {
            title: value.title.trim(),
            brand: value.brand.trim(),
            sku: value.sku.trim(),
        }

        addProduct(productData);
        setValue({title: '', brand: '', sku: '', price: ''});

    }
    const formRef = useOutsideClick<HTMLFormElement>(onClose)

    return (
        <div
            className={cl.modal}>
            <form
                ref={formRef}
                className={cl.formNewProduct}
                onSubmit={handleSubmit}>
                <div className={cl.inputProduct}>
                    <label htmlFor='title'>Введите наименование товара</label>
                    <input
                        className={cl.input}
                        id="title"
                        name="title"
                        type="text"
                        value={value.title}
                        onChange={handleChange}/>
                </div>
                <div className={cl.inputProduct}>
                    <label htmlFor='brand'>Введите Вендор</label>
                    <input
                        className={cl.input}
                        id="brand"
                        name="brand"
                        type="text"
                        value={value.brand}
                        onChange={handleChange}/>
                </div>
                <div className={cl.inputProduct}>
                    <label htmlFor='sku'>Введите Артикул</label>
                    <input
                        className={cl.input}
                        id="sku"
                        name="sku"
                        type="text"
                        value={value.sku}
                        onChange={handleChange}/>
                </div>
                <div className={cl.inputProduct}>
                    <label htmlFor='price'>Введите Цену</label>
                    <input
                        className={cl.input}
                        id="price"
                        name="price"
                        type="number"
                        value={value.price}
                        onChange={handleChange}/>
                </div>
                <button className={cl.buttonAddProduct}>Отправить в базу</button>
            </form>
        </div>
    );
};

export default NewProduct;