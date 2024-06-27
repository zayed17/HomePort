import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/user/Home';
import OwnerLogin from '../pages/owner/Login';
import OwnerSignup from '../pages/owner/SignUp';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/owner-login' element={<OwnerLogin />} />
        <Route path='/owner-signup' element={<OwnerSignup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
