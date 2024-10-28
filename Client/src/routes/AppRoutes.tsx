// import  {  lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// // import VerifyRoute from './Verify';
// // import loaderGif from '/assets/gifff.gif';
// import NotFoundPage from '../pages/NotFound';

// const Home = lazy(() => import('../pages/user/Home'));
// const Profile = lazy(() => import('../pages/user/Profile'));
// const PostedPage = lazy(() => import('../pages/user/PostProperties'));
// const PropertiesPage = lazy(() => import('../pages/user/Properties'));
// const PaymentPage = lazy(() => import('../pages/user/PaymentPage'));
// const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
// const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
// const AdminProperty = lazy(() => import('../pages/admin/Property'));
// const AdminUser = lazy(() => import('../pages/admin/User'));
// const PropertyDetailsForm = lazy(() => import('../pages/user/PropertyAdd'));
// const PropertyListing = lazy(() => import('../pages/user/PropertyList'));
// const PropertyDetails = lazy(() => import('../pages/user/PropertyDetails'));
// const SponserPage = lazy(() => import('../pages/user/SponserPage'));
// const PaymentSuccess = lazy(() => import('../pages/user/SuccessPage'));
// const AdsPage = lazy(() => import('../pages/user/AdsPage'));
// const CreateAdPage = lazy(() => import('../pages/user/CreateAds'));
// const Favourites = lazy(() => import('../pages/user/Favourites'));
// const Subscription = lazy(() => import('../pages/admin/Subscription'));
// const BookingPage = lazy(() => import('../pages/user/BookingPage'));
// const SubscriptionPage = lazy(() => import('../pages/user/SubscriptionPage'));
// const ChatPage = lazy(() => import('../pages/user/ChatPage'));
// const BookingDetails = lazy(() => import('../pages/user/BookedSinglePage'));
// const Dashboard = lazy(() => import('../pages/user/Dashboard'));

// // const LoadingSpinner = () => (
// //    <div className="flex items-center justify-center w-full h-screen bg-white">
// //       <img src={loaderGif} alt="Loading..." className="w-20 h-20" />
// //    </div>
// // );


// const AppRoutes = () => {
//   return (
//     <Router>
//       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//         <Toaster position="top-right" reverseOrder={true} />
//         {/* <Suspense fallback={<LoadingSpinner />}> */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/properties" element={<PropertyListing />} />
//             <Route path="/property/:id" element={<PropertyDetails />} />
//             <Route path="/sponsor/:id" element={<SponserPage />} />
//             <Route path="/addproperty" element={<PropertyDetailsForm />} />
//             <Route path="/addproperty/:propertyId" element={<PropertyDetailsForm />} />
//             <Route path="/favourites" element={<Favourites />} />
//             <Route path="/payment-success" element={<PaymentSuccess />} />
//             <Route path="/create-ad" element={<CreateAdPage />} />
//             <Route path="/booking/:id" element={<BookingPage />} />
//             <Route path="/subscription" element={<SubscriptionPage />} />
//             <Route path="/profile/dashboard" element={<Dashboard />} />
//             <Route path="/profile/details" element={<Profile/>} />
//             <Route path="/profile/properties"  element={<PropertiesPage/>}  />
//             <Route path="/profile/payment" element={<PaymentPage/>}  />
//             <Route path="/profile/booked" element={<PostedPage/>}  />
//             <Route path="/profile/ads"  element={<AdsPage/>} />
//             <Route path="/chat" element={<ChatPage />} />
//             <Route path="/chat/:chatId" element={<ChatPage />} />
//             <Route path="/booked-property/:id" element={<BookingDetails />} />

//             {/* <Route path="/admin" element={<VerifyRoute cookieName='Admintoken' redirectTo='/admin/dashboard' element={AdminLogin} />} />
//             <Route path="/admin/dashboard" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminDashboard} />} />
//             <Route path="/admin/property" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminProperty} />} />
//             <Route path="/admin/user" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={AdminUser} />} />
//             <Route path="/admin/subscription" element={<ProtectedRoute cookieName='Admintoken' redirectTo='/admin' element={Subscription} />} /> */}
//              <Route path="/admin" element={<AdminLogin />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/admin/property"  element={<AdminProperty />} />
//             <Route path="/admin/user"  element={<AdminUser />} />
//             <Route path="/admin/subscription"  element={<Subscription />} />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         {/* </Suspense> */}
//       </GoogleOAuthProvider>
//     </Router>
//   );
// };

// export default AppRoutes;

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NotFoundPage from '../pages/NotFound';

// Lazy load components
const Home = lazy(() => import('../pages/user/Home'));
const PaymentPage = lazy(() => import('../pages/user/PaymentPage'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const PropertyDetailsForm = lazy(() => import('../pages/user/PropertyAdd'));
const PropertyDetails = lazy(() => import('../pages/user/PropertyDetails'));
const ChatPage = lazy(() => import('../pages/user/ChatPage'));

// Non-lazy loaded components
import AdminLogin from '../pages/admin/AdminLogin';
import Favourites from '../pages/user/Favourites';
import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile'
import PostedPage from '../pages/user/PostProperties'
import PropertiesPage from '../pages/user/Properties'
import PropertyListing from '../pages/user/PropertyList'

 
// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-screen bg-white">
    <img src="/assets/gifff.gif" alt="Loading..." className="w-20 h-20" />
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertyListing />} />

          <Route path="/" element={<Suspense fallback={<LoadingSpinner />}><Home /></Suspense>} />
          <Route path="/property/:id" element={<Suspense fallback={<LoadingSpinner />}><PropertyDetails /></Suspense>} />
          <Route path="/profile/details" element={<Profile />} />
          <Route path="/profile/properties" element={<PropertiesPage />} />
          <Route path="/profile/payment" element={<Suspense fallback={<LoadingSpinner />}><PaymentPage /></Suspense>} />
          <Route path="/profile/booked" element={<PostedPage />} />
          <Route path="/addproperty" element={<Suspense fallback={<LoadingSpinner />}><PropertyDetailsForm /></Suspense>} />
          <Route path="/chat" element={<Suspense fallback={<LoadingSpinner />}><ChatPage /></Suspense>} />
          <Route path="/admin/dashboard" element={<Suspense fallback={<LoadingSpinner />}><AdminDashboard /></Suspense>} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default AppRoutes;
