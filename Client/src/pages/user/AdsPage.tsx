import ProfileSidebar from '../../components/user/ProfileSidebar'
import ProfileNav from '../../components/user/ProfileNav'
import Ads from '../../components/user/sections/profile/Ads'

const AdsPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav name={"Ads"}/>
        <div className="p-4">
          <Ads />
        </div>
      </div>
    </div>
  )
}

export default AdsPage