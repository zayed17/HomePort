import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../../store/user/userApi';
import Input from '../common/Input';
import Button from '../common/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { SignUpFormInputs, signUpSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';

const SignupForm: React.FC = () => {
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
              role:'owner',
          }).unwrap();
          clearError()
      } catch (error: any) {
          handleError(error.data.message ||'Something Happend')
          console.error('Error signing up:', error);
      }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md min-w-96 md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Sign Up</h2>
          <form className='mt-4' onSubmit={form.handleSubmit(onSubmit)}>
            <ErrorMessage />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div >
                <Input
                  register={form.register('firstName')}
                  placeholder="First Name"
                  error={form.formState.errors.firstName}
                />
              </div>
              <div >
                <Input
                  register={form.register('lastName')}
                  placeholder="Last Name"
                  error={form.formState.errors.lastName}
                />
              </div>
              <div >
                <Input
                  register={form.register('email')}
                  placeholder="Email"
                  error={form.formState.errors.email}
                />
              </div>
              <div >
                <Input
                  register={form.register('phone')}
                  placeholder="Phone"
                  error={form.formState.errors.phone}
                />
              </div>
              <div className="mb-3">
                <Input
                  register={form.register('password')}
                  placeholder="Password"
                  type="password"
                  error={form.formState.errors.password}
                />
              </div>
              <div className="mb-3">
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
          <div className="text-center mt-4">
            <span className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to='/owner-login' className='text-LightdarkBlue'>Login In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
