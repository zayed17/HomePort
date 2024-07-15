import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const AdminNavbar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-md text-gray-800 p-3 flex justify-between items-center">
      <div className="text-xl font-bold">Brand Name</div>
      <Link to="/" className="flex items-center bg-LightdarkBlue text-white py-2 px-4 rounded hover:bg-[#373759]">
        <FaArrowLeft className="mr-2" />
        Go Backs
      </Link>
    </div>
  );
};

export default AdminNavbar;
