import ProfileNav from '../../components/user/ProfileNav'
import ProfileSidebar from '../../components/user/ProfileSidebar'
import Favorite from '../../components/user/sections/profile/Favorite'

const FavoritePage = () => {
  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <Favorite />
        </div>
      </div>
    </div>  
    )
}

export default FavoritePage