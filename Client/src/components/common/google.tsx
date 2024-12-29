import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useGoogleSignMutation } from '../../store/user/userApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/user/userSlice';


interface signinwithgoogle {
  isLogin:Boolean,
  onClose: () => void; 

}

const SignInWithGoogle: React.FC<signinwithgoogle> = ({isLogin,onClose}) => {
  const [google] = useGoogleSignMutation();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Code response checking:', codeResponse);
      try {
        const res = await google({code:codeResponse.code}).unwrap()
        dispatch(loginSuccess(res.token));
        onClose()      
        toast.success('Login successfully'); 
        } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
    },
  });

  return (
    <div>
      <button onClick={googleLogin} className="bg-white border border-black text-black font-bold py-2 px-4 rounded-full flex items-center justify-center focus:outline-none focus:shadow-outline" type="button">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB&psig=AOvVaw16giowxjDc7ex_qkTh5D9v&ust=1719554771145000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjUkO-O-4YDFQAAAAAdAAAAABAE" alt="Google Logo"className="w-6 h-6 mr-2"/>
            {isLogin ? 'Login with Google' : 'Sign Up with Google'}
      </button>
    </div>
  );
};

export default SignInWithGoogle;