import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useLoginInMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import Input from '../common/Input';
import Button from '../common/Button';
import { LoginFormInputs, loginSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';

const LoginForm: React.FC = () => {
    const [login] = useLoginInMutation();
    const form = useFormValidation<LoginFormInputs>(loginSchema);
    const { handleError, clearError, ErrorMessage } = useErrorHandling();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const res = await login({ email: data.email, password: data.password }).unwrap();
            console.log(res);
            clearError()
        } catch (error: any) {
            handleError(error.data.message || 'Error logging in');
        }
    };

    return (
        <form className="px-5 mt-3" onSubmit={form.handleSubmit(onSubmit)}>
            <ErrorMessage />
            <div className="my-3">
                <Input register={form.register('email')} placeholder="Email" error={form.formState.errors.email} />
            </div>
            <div className="my-3">
                <Input register={form.register('password')} placeholder="Password" type="password" error={form.formState.errors.password} />
            </div>
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm;
