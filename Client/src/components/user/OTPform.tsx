// import React from 'react';
// import {useDispatch} from 'react-redux'
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { useOtpVerifyMutation } from '../../store/user/userApi';
// import { useFormValidation } from '../../hooks/useFormValidation';
// import { otpSchema, OtpFormInputs } from '../../validation/validationSchema';
// import useErrorHandling from '../../hooks/useErrorHandling';
// import { setToken,setUser } from '../../store/user/authSlice';
// import { useNavigate } from 'react-router-dom';
interface OTPFormProps {
  email: string;
  setIsLogin: (value: boolean) => void;
  // setIsSubmitting: (value: boolean) => void; 
  onClose : ()=> void;
}

// const OTPform: React.FC<OTPFormProps> = ({   setIsLogin, setIsSubmitting,email,onClose,isSubmitting }) => {
//   const [otpVerify] = useOtpVerifyMutation();
//   const form = useFormValidation<OtpFormInputs>(otpSchema);
//   const {ErrorMessage,clearError,handleError} = useErrorHandling()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const handleOTPSubmit = async (data:any) => {
//     try {
//       setIsSubmitting(true);
//      const res = await otpVerify({ otp:data.otp ,email}).unwrap();
//      console.log(res,"inclint")
//      clearError()
//       setIsLogin(true);
//       dispatch(setUser(res.user)); 
//       dispatch(setToken(res.token)); 
//       onClose()
//       navigate('/')
//     } catch (error:any) {
//       handleError(error.data.message)
//       console.error('Error verifying OTP:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form className="px-5" onSubmit={form.handleSubmit(handleOTPSubmit)}>
//       <ErrorMessage />
//       <div className="mb-4">
//         <Input register={form.register('otp')} placeholder="Enter Otp" error={form.formState.errors.otp} />
//       </div>
//       <div className="mb-4">
//         <Button type="submit">
//         {isSubmitting ? 'Verifying...' : 'Verify OTP'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default OTPform;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Input from '../common/Input';
import Button from '../common/Button';
import { useOtpVerifyMutation,useResendOTPMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import { otpSchema, OtpFormInputs } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import { setToken, setUser } from '../../store/user/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OTPform: React.FC<OTPFormProps> = ({   setIsLogin,email,onClose }) => {


  const [timer, setTimer] = useState(60);
  const [percentage, setPercentage] = useState(100);
  const [canResend, setCanResend] = useState(false);

  const [otpVerify] = useOtpVerifyMutation();
  const[resendOTP] = useResendOTPMutation()
  const form = useFormValidation<OtpFormInputs>(otpSchema);
  const { ErrorMessage, clearError, handleError } = useErrorHandling();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) {
          clearInterval(intervalId);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
      setPercentage(prev => prev - 100 / 60);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [canResend]);

  const handleOTPSubmit = async (data: any) => {
    try {
      const res = await otpVerify({ otp: data.otp, email }).unwrap();
      console.log(res, 'inclint');
      clearError();
      setIsLogin(true);
      dispatch(setUser(res.user));
      dispatch(setToken(res.token));
      onClose();
      navigate('/');
      toast.success('SignUp successfully'); 
    } catch (error: any) {
      handleError(error.data.message);
      console.error('Error verifying OTP:', error);
    } 
  };

  const handleResendOtp = async () => {
    try {
      setTimer(60);
      setPercentage(100);
      setCanResend(false);
      await resendOTP({ email }).unwrap();
      clearError();
    } catch (error: any) {
      handleError(error.data.message);
      console.error('Error resending OTP:', error);
    } 
  };

  return (
    <form className="px-5 bg-white rounded-lg w-full max-w-md mx-auto" onSubmit={form.handleSubmit(handleOTPSubmit)}>
      <ErrorMessage />
      <div className="mb-4 flex justify-center">
        <div className="relative w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={`${timer}s`}
            styles={buildStyles({
              pathColor: '#474973',
              textColor: '#474973',
              trailColor: '#e5e7eb',
              backgroundColor: '#474973',
            })}
          />
        </div>
      </div>
      <div className="mb-4">
        <Input register={form.register('otp')} placeholder="Enter OTP" error={form.formState.errors.otp} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button type="submit" className="mr-2 w-full">
          Verify OTP
        </Button>
        <Button
          type="button"
          onClick={handleResendOtp}
          disabled={!canResend}
          className={` ${canResend ? 'bg-DarkBlue text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
          Resend OTP
        </Button>
      </div>
    </form>
  );
};

export default OTPform;