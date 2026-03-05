import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import AuthPage from "@/pages/AuthPage";
import ProductPage from "@/pages/ProductPage";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<AuthPage />} />
                <Route path={'/auth'} element={<AuthPage />} />
                <Route path={'/product'} element={<ProductPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;