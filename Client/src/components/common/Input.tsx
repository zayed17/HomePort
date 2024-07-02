// components/Input.tsx
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
    register: UseFormRegisterReturn;
    placeholder: string;
    type?: string;
    error?: FieldError;
}

const Input: React.FC<InputProps> = ({ register, placeholder, type = 'text', error }) => {
    return (
        <div className="mb-3">
            <input
                className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register}
                placeholder={placeholder}
                type={type}
            />
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    );
};

export default Input;
