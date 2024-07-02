// components/SignUpForm.tsx
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../../store/user/userApi';
import Input from '../common/Input';
import Button from '../common/Button';
import {  useFormValidation } from '../../hooks/useFormValidation';
import { SignUpFormInputs, signUpSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
interface SignUpFormProps {
    setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: (value: string) => void; 

}



const SignUpForm: React.FC<SignUpFormProps> = ({ setOtpSent,setEmail }) => {
    const [signUp] = useSignUpMutation();
    const form = useFormValidation<SignUpFormInputs>(signUpSchema);
    const {ErrorMessage,clearError,handleError} = useErrorHandling()

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        try {
            await signUp({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role:'user',
            }).unwrap();
            setEmail(data.email); 
            setOtpSent(true)
            clearError()
        } catch (error: any) {
            handleError(error.data.message ||'Something Happend')
            console.error('Error signing up:', error);
        }
    };

    return (
        <form className="px-5 mt-3" onSubmit={form.handleSubmit(onSubmit)}>
            <ErrorMessage />
            <div className="flex mb-3 space-x-3">
                <div className="w-1/2">
                    <Input 
                        register={form.register('firstName')} 
                        placeholder="First Name" 
                        error={form.formState.errors.firstName} 
                    />
                </div>
                <div className="w-1/2">
                    <Input 
                        register={form.register('lastName')} 
                        placeholder="Last Name" 
                        error={form.formState.errors.lastName} 
                    />
                </div>
            </div>
            <div className="flex mb-3 space-x-3">
                <div className="w-1/2">
                    <Input 
                        register={form.register('email')} 
                        placeholder="Email" 
                        error={form.formState.errors.email} 
                    />
                </div>
                <div className="w-1/2">
                    <Input 
                        register={form.register('phone')} 
                        placeholder="Phone" 
                        error={form.formState.errors.phone} 
                    />
                </div>
            </div>
            <div className="flex mb-3 space-x-3">
                <div className="w-1/2">
                    <Input 
                        register={form.register('password')} 
                        placeholder="Password" 
                        type="password" 
                        error={form.formState.errors.password} 
                    />
                </div>
                <div className="w-1/2">
                    <Input 
                        register={form.register('confirmPassword')} 
                        placeholder="Confirm Password" 
                        type="password" 
                        error={form.formState.errors.confirmPassword} 
                    />
                </div>
            </div>
            <Button type="submit">Sign Up</Button>
        </form>
    );
};

export default SignUpForm;