import { lazy,Suspense } from 'react'
import ProfileSidebar from '../../components/user/ProfileSidebar'
import ProfileNav from '../../components/user/ProfileNav'
import Loader from '../../components/common/Loader';

const BookedProperty = lazy(()=> import('../../components/user/sections/profile/Booked')) ;

const PostProperties = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4 flex flex-col h-full"> 
          <Suspense fallback={<Loader />}>
            <BookedProperty />
          </Suspense>

        </div>
      </div>
    </div>
  )
}

export default PostProperties 