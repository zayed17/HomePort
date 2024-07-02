import React from 'react';
// import { Link } from 'react-router-dom';
// import useValidationForm from '../../hooks/useFormValidation';


// interface FormValues {
//   email: string;
//   password: string;
// }
const LoginForm: React.FC = () => {

  // const { register, handleSubmit, formState: { errors } } = useValidationForm();
  // const onSubmit = (data: FormValues) => {
  //   console.log(data);
  // };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <div className="max-w-md min-w-96  md:max-w-xl">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-full ${errors.email ? 'border-red-500' : 'border-black'}`}
                {...register('email')}
              />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className={`w-full px-3 py-2 border rounded-full ${errors.password ? 'border-red-500' : 'border-black'}`}
                {...register('password')}
              />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4   shadow-sm text-sm font-medium rounded-full text-white bg-darkBlue ">
              Login
            </button>
          </form>
          <h5 className='text-right font-light text-sm text-gray-700 mt-2'>Don't have an account?<Link to='/owner-signup' className='text-darkBlue'>SignUp</Link></h5>
        </div>
      </div> */}
    </div>
  );
};

export default LoginForm;
