import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">
        <span className="text-BlueGray">4</span>
        <span className="text-GrayishBlue">0</span>
        <span className="text-BlueGray">4</span>
      </h1>
      <p className="text-xl md:text-2xl text-GrayishBlue mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="bg-GrayishBlue text-white px-6 py-3 rounded-full hover:bg-BlueGray transition duration-300 text-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
