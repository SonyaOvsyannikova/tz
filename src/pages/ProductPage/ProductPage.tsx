import Product from "@/widgets/Product";
import Search from "@/features/Search";
import cl from './ProductPage.module.scss'

const ProductPage = () => {
    return (
        <div className={cl.productPage}>
            <Search />
            <Product />
        </div>
    );
};

export default ProductPage;