import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { LoginFormInputs, loginSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import { useLoginInMutation } from '../../store/user/userApi';


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
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md min-w-96  md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Login</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <ErrorMessage />
            <div className="mb-4">
              <Input register={form.register('email')} placeholder="Email" error={form.formState.errors.email} />
            </div>
            <div className="mb-4">
              <Input register={form.register('password')} placeholder="Password" type="password" error={form.formState.errors.password} />
            </div>
            <Button>Login</Button>
          </form>
          <h5 className='text-right font-light text-sm text-gray-700 mt-2'>Don't have an account?<Link to='/owner-signup' className='text-darkBlue'>SignUp</Link></h5>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
