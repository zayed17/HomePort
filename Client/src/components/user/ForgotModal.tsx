import React from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import useErrorHandling from '../../hooks/useErrorHandling';
import { ForgotPasswordFormInputs, forgotPasswordSchema } from '../../validation/validationSchema';
import { useVerifyEmailMutation,useResendOTPMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';

interface ForgotPasswordFormProps {
  onClose: () => void;
  setOtpSent: (otpSent: boolean) => void; 
  setEmail: (email: string) => void; 
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({  setOtpSent, setEmail }) => {
  const { handleError, clearError, ErrorMessage } = useErrorHandling();
  const form = useFormValidation<ForgotPasswordFormInputs>(forgotPasswordSchema);
  const [verifyEmail] = useVerifyEmailMutation();
  const[resendOTP] = useResendOTPMutation()

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      const res = await verifyEmail({ email: data.email }).unwrap();
      clearError();
      setEmail(data.email);
      setOtpSent(true);
      await resendOTP({ email:data.email }).unwrap();
    } catch (error: any) {
      handleError(error.data.message || 'Error verifying email');
    }
  };

  return (
    <form className="px-5 mt-3" onSubmit={form.handleSubmit(onSubmit)}>
      <ErrorMessage />
      <div className="my-3">
        <Input register={form.register('email')} placeholder="Email" error={form.formState.errors.email} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ForgotPasswordForm;