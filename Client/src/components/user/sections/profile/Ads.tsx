import { useNavigate } from 'react-router-dom';

const Ads = () => {
  const navigate = useNavigate();

  const handleAddAdClick = () => {
    navigate('/create-ad'); // Adjust the path to your ad creation page
  };

  return (
    <div className="relative min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 pt-8">Manage Your Ads</h1>
    
      <button
        onClick={handleAddAdClick}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-DarkBlue to-LightdarkBlue text-white p-6 rounded-full shadow-lg transition-transform transform hover:scale-95"
        aria-label="Add New Ad"
      >
        <span className="text-4xl font-extrabold">+</span>
      </button>
    </div>
  );
};

export default Ads;