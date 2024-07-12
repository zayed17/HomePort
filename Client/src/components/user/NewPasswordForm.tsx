import React from 'react';
import { NewPasswordSchema, NewPasswordFormInputs } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import Button from '../common/Button';
import Input from '../common/Input';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useForgotPasswordMutation } from '../../store/user/userApi';
import toast from 'react-hot-toast';

interface NewPasswordFormProps {
  onClose: () => void;
  email:string
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onClose,email }) => {
  const form = useFormValidation<NewPasswordFormInputs>(NewPasswordSchema);
  const [forgotPassword] = useForgotPasswordMutation()
  const { ErrorMessage, clearError, handleError } = useErrorHandling();

  const onSubmit = async(data: any) => {
   try {
    const res = await forgotPassword({email,newPassword:data.newPassword})
    if(res.data.success){
      clearError()
      onClose(); 
      toast.success('Password successfully changed');
    }
   } catch (error:any) {
    handleError(error.data.message)
   }
  };

  return (
    <form className="px-5 mt-3" onSubmit={form.handleSubmit(onSubmit)}>
      <ErrorMessage />
      <div className="my-3">
        <Input register={form.register('newPassword')} placeholder="New Password" type="password" error={form.formState.errors.newPassword} />
      </div>
      <div className="my-3">
        <Input register={form.register('confirmPassword')} placeholder="Confirm Password" type="password" error={form.formState.errors.confirmPassword} />
      </div>
      <Button type="submit">Change Password</Button>
    </form>
  );
};

export default NewPasswordForm;