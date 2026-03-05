import clsx from 'clsx'
import cl from './ButtonIcon.module.scss'
import React from "react";

type ButtonIconProps = {
    label?: React.ReactNode | string
    onClick?: (e: React.MouseEvent) => void
    className?: string | undefined
    children?: React.ReactNode
    id?: string,
    type?: 'button' | 'submit' | 'reset',
}
const ButtonIcon = (props: ButtonIconProps) => {
    const {
        label,
        onClick,
        className,
        id,
        type,
        children,
    } = props

    const combinedClassName = clsx(cl.buttonIcon, className)

    return (
        <button type={type} id={id} onClick={onClick} className={combinedClassName}>
            {label}{children}
        </button>
    );
};

export default ButtonIcon;