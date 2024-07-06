import * as Yup from 'yup';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface OtpFormInputs {
  otp: number;
}

import * as yup from 'yup';

export const otpSchema = yup.object().shape({
  otp: yup.number()
   .required('OTP is required')
   .positive('OTP must be positive')
   .integer('OTP must be an integer')
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
  .required('Phone number is required')
  .matches(/^[0-9]+$/, 'Phone number must be a number')
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must be at most 15 digits'),  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
});  