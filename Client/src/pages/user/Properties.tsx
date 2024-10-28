import { lazy, Suspense } from 'react';
import ProfileNav from '../../components/user/ProfileNav';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import Loader from '../../components/common/Loader';

const Property = lazy(() => import('../../components/user/sections/profile/Property'));



const PropertiesPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4 flex flex-col h-full">
          <Suspense fallback={<Loader />}>
            <Property />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;
