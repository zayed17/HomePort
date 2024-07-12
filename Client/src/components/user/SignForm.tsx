import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../../store/user/userApi';
import Input from '../common/Input';
import Button from '../common/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { SignUpFormInputs, signUpSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import SkeletonLoader from '../common/LoadingSkeleton';

interface SignUpFormProps {
    setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: (value: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setOtpSent,setEmail }) => {
    const [signUp] = useSignUpMutation();
    const form = useFormValidation<SignUpFormInputs>(signUpSchema);
    const { ErrorMessage, clearError, handleError } = useErrorHandling();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        setIsLoading(true);
        try {
            await signUp({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: 'user',
            }).unwrap();
            setEmail(data.email);
            setOtpSent(true);
            clearError();
        } catch (error: any) {
            handleError(error.data.message || 'Something happened');
            console.error('Error signing up:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <SkeletonLoader />
                    <p className="mt-4 text-gray-500">Please wait, loading...</p>
                </div>
            ) : (
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
            )}
        </>
    );
};

export default SignUpForm;
