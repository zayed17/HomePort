import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md min-w-96 md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Sign Up</h2>
          <form className='mt-2'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div >
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-full px-3 py-2 border border-black rounded-full"
                  placeholder="First Name"
                  required
                />
              </div>
              <div >
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="w-full px-3 py-2 border border-black rounded-full"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-black rounded-full"
                  placeholder="Phone"
                  required
                />
              </div>
              <div >
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-black rounded-full"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-full border-black"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-full border-black"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 shadow-sm text-sm font-medium rounded-full text-white bg-customRed"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to='/owner-login' className='text-customRed'>Login In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
