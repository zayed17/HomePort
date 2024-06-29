import { useFormik } from 'formik';
import { loginSchema, signUpSchema } from '../validation/validationSchema';

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

interface UseFormValidationProps {
  isLogin: boolean;
  handleSubmit: (values: FormData) => void;
}

export const useFormValidation = ({ isLogin, handleSubmit }: UseFormValidationProps) => {
  console.log(isLogin,handleSubmit,"getting or not")
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: isLogin ? loginSchema : signUpSchema,
    onSubmit: (values: FormData) => {
      handleSubmit(values);
    },
  });

  return formik;
};
