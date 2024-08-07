import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../pages/user/Home';
import Profile from '../pages/user/Profile';
import ChatPage from '../pages/user/ChatPage';
import PropertiesPage from '../pages/user/Properties';
import PaymentPage from '../pages/user/PaymentPage';
import AdminLogin from '../pages/admin/AdminLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProperty from '../pages/admin/Property';
import AdminUser from '../pages/admin/User';
import ProtectedRoute from './Protected'
import VerifyRoute from './Verify'
import PropertyDetailsForm from '../pages/user/PropertyAdd';
import PropertyListing from '../pages/user/PropertyList';
import PropertyDetails from '../pages/user/PropertyDetails';
import SponserPage from '../pages/user/SponserPage';
import PaymentSuccess from '../pages/user/SuccessPage';
import AdsPage from '../pages/user/AdsPage';
import CreateAdPage from '../pages/user/CreateAds';
import Favourites from '../pages/user/Favourites';
const AppRoutes = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={< PropertyListing/>} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/sponsor/:id" element={<SponserPage />} />
          <Route path="/addproperty" element={<PropertyDetailsForm />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/create-ad" element={<CreateAdPage />} />
          <Route path="/profile/details" element={< ProtectedRoute cookieName='token' redirectTo='/profile/details' element={Profile} />} />
          <Route path="/profile/properties" element={< ProtectedRoute cookieName='token' redirectTo='/profile/details' element={PropertiesPage} />} />
          <Route path="/profile/payment" element={< ProtectedRoute cookieName='token' redirectTo='/profile/details' element={PaymentPage} />} />
          <Route path="/profile/chat" element={< ProtectedRoute cookieName='token' redirectTo='/profile/details' element={ChatPage} />} />
          <Route path="/profile/ads" element={< ProtectedRoute cookieName='token' redirectTo='/profile/details' element={AdsPage} />} />
          <Route path="/admin" element={< VerifyRoute cookieName='Admintoken' redirectTo='/admin/dashboard' element={AdminLogin} />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminDashboard} />}/>
          <Route path="/admin/property" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminProperty} />}/>
          <Route path="/admin/user" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminUser} />}/>
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default AppRoutes;
