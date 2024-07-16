import { useGoogleLogin } from '@react-oauth/google';
import {useDispatch} from 'react-redux'
import { setUser,setToken } from '../../store/user/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

interface signinwithgoogle {
  isLogin:Boolean,
  onClose: () => void; 

}

const SignInWithGoogle: React.FC<signinwithgoogle> = ({isLogin,onClose}) => {
    const dispatch = useDispatch()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Code response:', codeResponse);
      try {
        const response = await axios.post('http://localhost:5001/user/google', {
          code: codeResponse.code,
        },{withCredentials:true});
        const {userDetails,token,role} = response.data
        dispatch(setUser({userDetails,role})); 
        dispatch(setToken(token)); 
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