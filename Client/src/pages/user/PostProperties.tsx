import ProfileSidebar from '../../components/user/ProfileSidebar'
import ProfileNav from '../../components/user/ProfileNav'
import Chat from '../../components/user/sections/profile/Posted'

const PostProperties = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default PostProperties