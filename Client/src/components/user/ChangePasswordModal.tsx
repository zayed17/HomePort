import Input from '../common/Input';
import Button from '../common/Button';
import { SubmitHandler } from '../../../node_modules/react-hook-form/dist';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ChangePasswordFormInput, ChangePasswordSchema } from '../../validation/validationSchema';
import useErrorHandling from '../../hooks/useErrorHandling';
import { useChangePasswordMutation } from '../../store/user/userApi';
import toast from 'react-hot-toast';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, email }) => {
    const form = useFormValidation<ChangePasswordFormInput>(ChangePasswordSchema);
    const [changePassword] = useChangePasswordMutation()
    const { handleError, clearError, ErrorMessage } = useErrorHandling();

    const handleFormSubmit: SubmitHandler<ChangePasswordFormInput> = async (data) => {
        try {
            const res = await changePassword({ email, password: data.password, newPassword: data.newPassword }).unwrap()
            onClose();
            clearError()
            toast.success('Password succesfully changed');
        } catch (error: any) {
            handleError(error.data.message)
        }

    };


    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="modal-title text-2xl font-bold mb-4">Change Password</h2>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <ErrorMessage />
                    <Input type="password" register={form.register('password')} error={form.formState.errors.password} placeholder="Current Password" />
                    <Input type="password" register={form.register('newPassword')} error={form.formState.errors.newPassword} placeholder="New Password" />
                    <Input type="password" register={form.register('confirmPassword')} error={form.formState.errors.confirmPassword} placeholder="Confirm Password" />
                    <Button type="submit">Change Password</Button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;