import { useDispatch } from 'react-redux'
import { SubmitHandler } from '../../../node_modules/react-hook-form/dist';
import { useLoginInMutation } from '../../store/user/userApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import Input from '../common/Input';
import Button from '../common/Button';
import { LoginFormInputs, loginSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
// import { setUser, setToken } from '../../store/user/userSlice';
import toast from 'react-hot-toast';

interface LoginFormProps {
    onClose: () => void;
    onForgotPassword: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onClose, onForgotPassword }) => {
    const [login] = useLoginInMutation();
    const form = useFormValidation<LoginFormInputs>(loginSchema);
    const { handleError, clearError, ErrorMessage } = useErrorHandling();
    useDispatch()

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const res = await login({ email: data.email, password: data.password, role: 'user' }).unwrap();
            console.log(res, "login res")
            clearError()
            // const { user, role, token } = res
            onClose()
            toast.success('Login successfully');
        } catch (error: any) {
            handleError(error.data.message || 'Error logging in');
        }
    };



    return (
        <form className="px-5 mt-3" onSubmit={form.handleSubmit(onSubmit)}>
            <ErrorMessage />
            <div className="my-3">
                <Input register={form.register('email')} placeholder="Email" error={form.formState.errors.email} />
            </div>
            <div className="my-3">
                <Input register={form.register('password')} placeholder="Password" type="password" error={form.formState.errors.password} />
            </div>
            <Button type="submit">Login</Button>
            <h4 className='text-DarkBlue text-right text-sm' style={{ cursor: 'pointer' }} onClick={onForgotPassword}>
                Forgot Password
            </h4>
        </form>
    );
};

export default LoginForm;
