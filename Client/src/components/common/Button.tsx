import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit';
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean; 
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children, className }) => {
    return (
        <button
            className={`bg-BlueGray text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
