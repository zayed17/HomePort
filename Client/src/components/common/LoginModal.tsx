import React, { useState } from 'react';
import { useLoginInMutation ,useSignUpMutation} from '../../store/user/userApi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true); 
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });

    const [login] = useLoginInMutation();
    const [signUp] = useSignUpMutation()

    const toggleForm = () => {
        setIsLogin(prevState => !prevState); 
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submited")
        if (isLogin) {
            const res = await login({ email: formData.email, password: formData.password }).unwrap()
            console.log(res,"of login")
        } else {
            await signUp({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            }).unwrap()
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-full sm:max-w-md transition-opacity duration-300 ease-in-out">
                <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-700" >
                    &times;
                </button>
                <h2 className="text-black text-center py-3 text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form className='px-5' onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <input
                                    className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    name='firstName'
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <input
                                    className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    name='lastName'
                                    type="text"
                                    value={formData.lastName}
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}
                    {isLogin && (
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name='email'
                            value={formData.email}
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                    </div>
                    )}
                    {!isLogin && (
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <input
                                    className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="text"
                                    name='email'
                                    value={formData.email}
                                    placeholder="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <input
                                    className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="tel"
                                    name='phone'
                                    value={formData.phone}
                                    placeholder="Phone"
                                    onChange={handleInputChange}
                                />  
                            </div>
                        </div>
                    )}
                    {isLogin && (
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name='password'
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                    </div>
                    )}    
                    {!isLogin && (
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <input
                                    className="shadow  appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name='password'
                                    type="password"
                                    value={formData.password}
                                    placeholder="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <input
                                    className="shadow appearance-none border border-black rounded-full px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name='confirmPassword'
                                    type="password"
                                    value={formData.confirmPassword}
                                    placeholder="confirm password"
                                    onChange={handleInputChange}
                                />  
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <button className="bg-customRed text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center my-4">
                    <hr className="border-t-2 border-gray-200 w-1/3 mr-4" />
                    <h5 className="text-black">or</h5>
                    <hr className="border-t-2 border-gray-200 w-1/3 ml-4" />
                </div>
                <div className="flex items-center justify-center mt-4">
              <div className="mb-4 ">
                  <button className="bg-white border text-black font-light py-2 px-4 rounded-full flex items-center justify-center focus:outline-none focus:shadow-outline" type="button">
                      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB&psig=AOvVaw16giowxjDc7ex_qkTh5D9v&ust=1719554771145000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjUkO-O-4YDFQAAAAAdAAAAABAE" alt="Google Logo" className="w-6 h-6 mr-2"/>
                     {isLogin ? 'Login with Google' : 'Sign Up with Google'}
                  </button>
              </div>
              </div>
                <h4 className="text-gray-600 font-thin text-sm text-right">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span className="text-customRed">
                        <button className="text-customRed underline focus:outline-none" type='button' onClick={toggleForm}>
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </span>
                </h4>
            </div>
        </div>
    );
};

export default Modal;

