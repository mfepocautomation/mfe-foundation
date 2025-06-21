import type { FC, ButtonHTMLAttributes } from 'react';
export interface ButtonProps {
    /**
     * This is a description
     */
    secondary?: boolean;
}
declare const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>;
export default Button;
