import React from 'react';
import {useDispatch} from 'react-redux'
import Input from '../common/Input';
import Button from '../common/Button';
import { useOtpVerifyMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import { otpSchema, OtpFormInputs } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import { setToken,setUser } from '../../store/user/authSlice';
import { useNavigate } from 'react-router-dom';
interface OTPFormProps {
  email: string;
  setIsLogin: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void; 
  isSubmitting: boolean;
  onClose : ()=> void;
}

const OTPform: React.FC<OTPFormProps> = ({   setIsLogin, setIsSubmitting,email,onClose,isSubmitting }) => {
  const [otpVerify] = useOtpVerifyMutation();
  const form = useFormValidation<OtpFormInputs>(otpSchema);
  const {ErrorMessage,clearError,handleError} = useErrorHandling()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOTPSubmit = async (data:any) => {
    try {
      setIsSubmitting(true);
     const res = await otpVerify({ otp:data.otp ,email}).unwrap();
     console.log(res,"inclint")
     clearError()
      setIsLogin(true);
      dispatch(setUser(res.user)); 
      dispatch(setToken(res.token)); 
      onClose()
      navigate('/')
    } catch (error:any) {
      handleError(error.data.message)
      console.error('Error verifying OTP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="px-5" onSubmit={form.handleSubmit(handleOTPSubmit)}>
      <ErrorMessage />
      <div className="mb-4">
        <Input register={form.register('otp')} placeholder="Enter Otp" error={form.formState.errors.otp} />
      </div>
      <div className="mb-4">
        <Button type="submit">
        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </div>
    </form>
  );
};

export default OTPform;
