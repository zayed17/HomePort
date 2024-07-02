// import { useForm, UseFormReturn } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   phone: number;
//   email: string;
//   password: string;
//   confirmPassword?: string; 
// }

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required('First name is required'),
//   lastName: Yup.string().required('Last name is required'),
//   phone: Yup.number().required('Phone number is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string()
//    .min(6, 'Password must be at least 6 characters')
//    .required('Password is required'),
//   confirmPassword: Yup.string()
//    .oneOf([Yup.ref('password')], 'Passwords must match')
//    .when('password', (password, schema) => {
//       return password && password.length > 0? Yup.string().required('Please confirm your password') : schema;
//     }),
// });

// const useValidationForm = (): UseFormReturn<FormValues> => {
//   return useForm<FormValues>({
//     resolver: yupResolver(validationSchema),
//   });
// };

// export default useValidationForm;



