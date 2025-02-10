import React from "react";

interface ButtonProps {
    children ?: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className ?: string,
    disabled ?: boolean
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => {
    return <button onClick={onClick} className={className} disabled={disabled}>{children}</button>;
};