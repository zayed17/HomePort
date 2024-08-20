import ProfileNav from '../../components/user/ProfileNav'
import ProfileSidebar from '../../components/user/ProfileSidebar'
import Property from '../../components/user/sections/profile/Property'

const PropertiesPage = () => {
  return (
    <div className="flex h-auto bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <Property />
        </div>
      </div>
    </div>  
    )
}

export default PropertiesPage