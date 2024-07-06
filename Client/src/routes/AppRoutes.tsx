import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import OwnerLogin from '../pages/owner/Login';
import OwnerSignup from '../pages/owner/SignUp';
import Profile from '../pages/user/Profile';
import ChatPage from '../components/user/ChatPage';
import FavoritePage from '../components/user/FavoritePage';
import PaymentPage from '../components/user/PaymentPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-signup" element={<OwnerSignup />} />
        <Route path="/profile/details" element={<Profile />} />
        <Route path="/profile/favorite" element={<FavoritePage />} />
        <Route path="/profile/payment" element={<PaymentPage />} />
        <Route path="/profile/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
