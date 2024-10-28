import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProfileNavProps {
  name: string; 
}

const ProfileNav: React.FC<ProfileNavProps> = ({ name }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-md text-gray-800 p-4 flex justify-between items-center md:px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
      </div>
      <Link to="/" className="flex items-center bg-BlueGray text-white py-2 px-4 rounded-lg hover:bg-BlueGrayDark transition-colors duration-200">
        <FaArrowLeft className="mr-2" />
        <span className="hidden md:block">Back</span> 
      </Link>
    </div>
  );
};

export default ProfileNav;
