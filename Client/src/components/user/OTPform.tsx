import React from 'react';

interface OTPFormProps {
  otp: string;
  setOTP: (value: string) => void;
  isSubmitting: boolean;
  handleOTPSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const OTPform: React.FC<OTPFormProps> = ({ otp, setOTP, isSubmitting, handleOTPSubmit }) => {
  return (
    <form className="px-5" onSubmit={handleOTPSubmit}>
      <div className="mb-4">
        <input
          className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="otp"
          name="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-darkBlue text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </form>
  );
};

export default OTPform;