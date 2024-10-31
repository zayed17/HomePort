import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Loader from '../components/common/Loader';
import NotFoundPage from '../pages/NotFound';
// import VerifyRoute from './Verify';

const Home = lazy(() => import('../pages/user/Home'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const PropertyDetailsForm = lazy(() => import('../pages/user/PropertyAdd'));
const ChatPage = lazy(() => import('../pages/user/ChatPage'));
const BookingDetails = lazy(() => import('../pages/user/BookedSinglePage'));

import AdminLogin from '../pages/admin/AdminLogin';
import Favourites from '../pages/user/Favourites';
import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import PostedPage from '../pages/user/PostProperties';
import PropertiesPage from '../pages/user/Properties';
import PropertyListing from '../pages/user/PropertyList';
import PropertyDetails from '../pages/user/PropertyDetails';
import AdminProperty from '../pages/admin/Property';
import AdminUser from '../pages/admin/User';
import Subscription from '../pages/admin/Subscription';
import SubscriptionPage from '../pages/user/SubscriptionPage';
import ProtectedRoute from './Protected';
import SponserPage from '../pages/user/SponserPage';
import PaymentSuccess from '../pages/user/SuccessPage';
import BookingPage from '../pages/user/BookingPage';

const AppRoutes = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster position="top-right" reverseOrder={true} />

        <Routes>
          <Route path="/" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/properties" element={<PropertyListing />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/sponsor/:id" element={<SponserPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/booking/:id" element={<BookingPage />} /> 
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path="/profile/details" element={<ProtectedRoute redirectTo='/' element={Profile} />} />
          <Route path="/profile/properties" element={<ProtectedRoute redirectTo='/' element={PropertiesPage} />} />
          <Route path="/profile/booked" element={<ProtectedRoute redirectTo='/' element={PostedPage} />} />
          <Route path="/booked-property/:id" element={<BookingDetails />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/addproperty" element={<Suspense fallback={<Loader />}><PropertyDetailsForm /></Suspense>} />
          <Route path="/chat" element={<Suspense fallback={<Loader />}><ChatPage /></Suspense>} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/property" element={<AdminProperty/>} />
          <Route path="/admin/user" element={<AdminUser/>} />
          <Route path="/admin/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </GoogleOAuthProvider>
    </Router>
  );
};

export default AppRoutes;
