import cl from './AuthForm.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import Remove from '@/assets/icons/remove.svg?react'
import UserIcon from '@/assets/icons/userIcon.svg?react'
import Lock from '@/assets/icons/lock.svg?react'
import EyeIconOff from '@/assets/icons/eyeOff.svg?react'
import Logo from '@/assets/icons/logo.svg?react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const authScheme = z.object({
    login: z.string().min(3, 'Минимум 3 символа'),
    password: z.string().min(8, 'Минимум 8 символов'),
    rememberMe: z.boolean(),
})
type LoginFormData = z.infer<typeof authScheme>

const AuthForm = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const navigate = useNavigate()

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(authScheme),
        defaultValues: {
            login: '',
            password: '',
            rememberMe: false,
        }
    });

    if(isLoading) {
        return <>Загрузка...</>
    }
    if(serverError) {
        return <>Ошибка</>
    }
    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setServerError(null)

        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: data.login,
                password: data.password,
                expiresInMins: 30,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.data;
            console.log(result);

            if (response.status !== 200) {
                throw new Error(result.message || 'Ошибка входа. Проверьте логин и пароль.')
            }
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            localStorage.setItem('user', JSON.stringify(result))

            navigate('/product')
        } catch(e) {
            console.log(e, 'Ошибка Входа')
            setServerError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            className={cl.authForm}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={cl.authFormLogo}>
                <Logo/>
            </div>
            <div className={cl.authFormHeader}>
                <h1 className={cl.authFormTitle}>Добро пожаловать!</h1>
                <p className={cl.authFormDescription}>Пожалуйста, авторизируйтесь</p>
            </div>
            <div className={cl.authFormBody}>
                <div className={cl.authInputField}>
                    <label
                        className={cl.authFormLabel}
                        htmlFor="login">Логин</label>
                    <div className={cl.authInputFieldPassword}>
                        <div className={cl.authFormIcon}>
                            <UserIcon />
                        </div>
                        <input
                            className = {cl.authFormInput}
                            {...register('login')} />
                        <ButtonIcon
                            type = 'button'
                            onClick={() => {setValue('login','')}}
                            className={cl.authInputIcon}
                            label={<Remove className={cl.removeIcon}/>}
                        />
                    </div>
                    {errors.login && <span className={cl.error}>{errors.login.message}</span>}
                </div>

                <div className={cl.authInputField}>
                    <label
                        className={cl.authFormLabel}
                        htmlFor="login">Пароль</label>
                    <div className={cl.authInputFieldPassword}>
                        <div className={cl.authFormIcon}>
                            <Lock />
                        </div>
                        <input
                            className = {cl.authFormInput}
                            {...register('password')}
                        type={showPassword ? 'text' : 'password'}/>
                        <ButtonIcon
                            type = 'button'
                            onClick={() => {setShowPassword(!showPassword)}}
                            className={cl.authInputIcon}
                            label={<EyeIconOff className={cl.eyeIcon}/>}
                        />
                    </div>
                    {errors.password && <span className={cl.error}>{errors.password.message}</span>}
                </div>

                <div className={cl.authFormRemember}>
                    <input className={cl.authFormInputCheck} type = 'checkbox' id='check1' {...register('rememberMe')} />
                    <label className={cl.authFormRememberDesc} htmlFor='check1'> Запомнить меня </label>
                </div>
                    <button className={cl.authFormButton}> Войти </button>
                    <span className={cl.authFormLine}> или </span>
            </div>
            <p className={cl.authFormLinkDesc}>Нет аккаунта? <a href='#' className={cl.authFormLink}>Создать</a> </p>
        </form>
    );
};

export default AuthForm;