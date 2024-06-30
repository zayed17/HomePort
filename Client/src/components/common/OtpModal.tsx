import React, { useState } from 'react';

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onSuccess: () => void; // Callback function for successful OTP verification
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, email, onSuccess }) => {
    console.log(isOpen,onClose,"in otp ")
    const [otp, setOTP] = useState('');

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value);
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform OTP verification logic (API call, etc.)
        // For demonstration, assuming OTP is correct if it matches '123456'
        if (otp === '123456') {
            // Call onSuccess callback to handle successful verification
            onSuccess();
        } else {
            // Handle incorrect OTP scenario (display error, retry, etc.)
            alert('Incorrect OTP. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-full sm:max-w-md transition-opacity duration-300 ease-in-out">
                <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-700">
                    &times;
                </button>
                <h2 className="text-black text-center py-3 text-2xl font-bold">OTP Verification</h2>
                <form className="px-5" onSubmit={handleVerifyOTP}>
                    <div className="mb-4">
                        <p className="text-center">An OTP has been sent to your email: {email}</p>
                    </div>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="otp"
                            type="text"
                            value={otp}
                            placeholder="Enter OTP"
                            onChange={handleOTPChange}
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-darkBlue text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPModal;
