import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import OwnerLogin from '../pages/owner/Login';
import OwnerSignup from '../pages/owner/SignUp';
import Profile from '../pages/user/Profile';
import UserDetails from '../components/user/sections/profile/UserDetails';
import Favorite from '../components/user/sections/profile/Favorite';
import Payment from '../components/user/sections/profile/Payment';
import Chat from '../components/user/sections/profile/Chat';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-signup" element={<OwnerSignup />} />
        <Route path="/profile/details" element={<Profile />}>
          <Route path="details" element={<UserDetails />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="payment" element={<Payment />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
