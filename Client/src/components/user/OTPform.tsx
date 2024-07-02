// import React from 'react';
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { useOtpVerifyMutation} from '../../store/user/userApi';
// import {  useFormValidation } from '../../hooks/useFormValidation';
// import { otpSchema, OtpFormInputs } from '../../validation/validationSchema';


// interface OTPFormProps {
//   otp: string;
//   setOTP: (value: string) => void;
//   setIsLogin: (value: boolean) => void;
//   setIsSubmitting: (value: boolean) => void; 
// }



// const OTPform: React.FC<OTPFormProps> = ({ otp, setOTP, setIsLogin,setIsSubmitting }) => {
//   const [otpVerify] = useOtpVerifyMutation()
//   const form = useFormValidation<OtpFormInputs>(otpSchema);



//   const handleOTPSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//         setIsSubmitting(true);
//         await otpVerify({email:formData.email,otp:otp})
//         setIsLogin(true);
//         setOTP('');
//         onClose();
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <form className="px-5" onSubmit={handleOTPSubmit}>
//       <div className="mb-4">
//         <input
//           className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="otp"
//           name="otp"
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOTP(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <button
//           className="bg-darkBlue text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
//           type="submit"
//           disabled={isSubmitting}
//         >
//           {isSubmitting? 'Verifying...' : 'Verify OTP'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default OTPform;


import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useOtpVerifyMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import { otpSchema, OtpFormInputs } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';

interface OTPFormProps {
  email: string;
  setIsLogin: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void; 
  isSubmitting: boolean;
}

const OTPform: React.FC<OTPFormProps> = ({   setIsLogin, setIsSubmitting,email ,isSubmitting }) => {
  const [otpVerify] = useOtpVerifyMutation();
  const form = useFormValidation<OtpFormInputs>(otpSchema);
  const {ErrorMessage,clearError,handleError} = useErrorHandling()

  const handleOTPSubmit = async (data:any) => {
    try {
      setIsSubmitting(true);
     const res = await otpVerify({ otp:data.otp ,email}).unwrap();
     console.log(res,"inclint")
     clearError()
      setIsLogin(true);
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
