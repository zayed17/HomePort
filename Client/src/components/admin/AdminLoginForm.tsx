import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Input from '../common/Input';
import Button from '../common/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { LoginFormInputs, loginSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const form = useFormValidation<LoginFormInputs>(loginSchema);
  const { handleError, clearError, ErrorMessage } = useErrorHandling();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5002/admin/login', {
        email: data.email,
        password: data.password,
      });
      
      navigate('/admin/dashboard')      
      console.log('Login successful:', response.data);
      clearError();
    } catch (error: any) {
      handleError(error.response?.data?.message || 'Error logging in');
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