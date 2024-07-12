import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../pages/user/Home';
import Profile from '../pages/user/Profile';
import ChatPage from '../pages/user/ChatPage';
import FavoritePage from '../pages/user/FavoritePage';
import PaymentPage from '../pages/user/PaymentPage';
import AdminLogin from '../pages/admin/AdminLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AppRoutes = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/details" element={<Profile />} />
          <Route path="/profile/favorite" element={<FavoritePage />} />
          <Route path="/profile/payment" element={<PaymentPage />} />
          <Route path="/profile/chat" element={<ChatPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default AppRoutes;
