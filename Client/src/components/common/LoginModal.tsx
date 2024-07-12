// import React, { useState } from 'react';
// import OTPform from '../user/OTPform';
// import LoginForm from '../user/LoginForm';
// import SignUpForm from '../user/SignForm';
// import GoogleAuth from './google';

// // import { GoogleLogin } from '@react-oauth/google';


// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('');
//     const [otpSent, setOtpSent] = useState(false);


//     const toggleForm = () => {
//         setIsLogin(prevState => !prevState);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg relative w-full sm:max-w-md transition-opacity duration-300 ease-in-out">
//                 <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-700">&times;</button>
//                 <h2 className="text-black text-center py-3 text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
//                 {!otpSent ? (
//                     isLogin ? <LoginForm onClose={onClose} /> : <SignUpForm setOtpSent={setOtpSent} setEmail={setEmail} />
//                 ) : (
//                     <OTPform setIsLogin={setIsLogin} onClose={onClose} email={email} />
//                 )}
//                 {!otpSent ? (
//                     <>
//                         <div className="flex items-center justify-center my-4">
//                             <hr className="border-t-2 border-gray-200 w-1/3 mr-4" />
//                             <h5 className="text-black">or</h5>
//                             <hr className="border-t-2 border-gray-200 w-1/3 ml-4" />
//                         </div>
//                         <div className="flex justify-center mb-4">
//                             <GoogleAuth onClose={onClose} isLogin={isLogin} />
//                         </div>
//                         <h4 className="text-gray-600 font-thin text-sm text-right">
//                             {isLogin ? "Don't have an account?" : "Already have an account?"}
//                             <span className="text-darkBlue">
//                                 <button className="text-darkBlue underline focus:outline-none" type="button" onClick={toggleForm}>
//                                     {isLogin ? 'Sign Up' : 'Login'}
//                                 </button>
//                             </span>
//                         </h4>
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     );
// };

// export default Modal;
import React, { useState } from 'react';
import OTPform from '../user/OTPform';
import LoginForm from '../user/LoginForm';
import SignUpForm from '../user/SignForm';
import ForgotPasswordForm from '../user/ForgotModal';
import NewPasswordForm from '../user/NewPasswordForm'; 
import GoogleAuth from './google';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); 

  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleOtpVerified = () => {
    setIsOtpVerified(true); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-full sm:max-w-md transition-opacity duration-300 ease-in-out">
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-700">&times;</button>
        <h2 className="text-black text-center py-3 text-2xl font-bold">
          {isOtpVerified ? 'New Password' : isForgotPassword ? 'Forgot Password' : isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {!otpSent && !isForgotPassword ? (
          isLogin ? <LoginForm onClose={onClose} onForgotPassword={handleForgotPassword} /> : <SignUpForm setOtpSent={setOtpSent} setEmail={setEmail} />
        ) : otpSent && !isOtpVerified ? (
          <OTPform setIsLogin={setIsLogin} onClose={onClose} email={email} onOtpVerified={handleOtpVerified} isSignupOtp={isForgotPassword ? false : true} />
        ) : isOtpVerified ? (
          <NewPasswordForm onClose={onClose} email={email}  />
        ) : (
          <ForgotPasswordForm onClose={onClose} setOtpSent={setOtpSent} setEmail={setEmail} />
        )}
        {!otpSent && !isForgotPassword ? (
          <>
            <div className="flex items-center justify-center my-4">
              <hr className="border-t-2 border-gray-200 w-1/3 mr-4" />
              <h5 className="text-black">or</h5>
              <hr className="border-t-2 border-gray-200 w-1/3 ml-4" />
            </div>
            <div className="flex justify-center mb-4">
              <GoogleAuth onClose={onClose} isLogin={isLogin} />
            </div>
            <h4 className="text-gray-600 font-thin text-sm text-right">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span className="text-darkBlue">
                <button className="text-darkBlue underline focus:outline-none" type="button" onClick={toggleForm}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </span>
            </h4>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;