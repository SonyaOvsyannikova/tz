import AuthForm from "@/features/AuthForm";
import cl from './AuthPage.module.scss'

const AuthPage = () => {
    return (
        <div className={cl.authPage}>
            <AuthForm />
        </div>
    );
};

export default AuthPage;