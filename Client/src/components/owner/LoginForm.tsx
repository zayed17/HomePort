import React from 'react';
import { Link } from 'react-router-dom';


const LoginForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md min-w-96  md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Login</h2>
          <form >
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3  py-2  border border-black rounded-full"
                placeholder="email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2  border rounded-full border-black "
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4   shadow-sm text-sm font-medium rounded-full text-white bg-customRed ">
              Sign In
            </button>
          </form>
          <h5 className='text-right font-light text-sm text-gray-700 mt-2'>Don't have an account?<Link to='/owner-signup' className='text-customRed'>SignUp</Link></h5>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
