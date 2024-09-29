import React from 'react';
import { SubmitHandler } from '../../../node_modules/react-hook-form/dist';
import {  useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import {useLoginInMutation} from '../../store/admin/adminApi'
import { useFormValidation } from '../../hooks/useFormValidation';
import { LoginFormInputs, loginSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [login] = useLoginInMutation()
  const form = useFormValidation<LoginFormInputs>(loginSchema);
  const { handleError, clearError, ErrorMessage } = useErrorHandling();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login({email:data.email,password:data.password}).unwrap()
      console.log(response,"this is ")      
      navigate('/admin/dashboard')      
      clearError();
    } catch (error: any) {
      console.log(error.data,"error is consoleing")
      handleError(error.data || 'Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md min-w-96 md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Admin Login</h2>
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
        </div>
      </div>
    </div>
  );
};

export default LoginForm;