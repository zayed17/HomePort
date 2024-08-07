
const AdBanner = () => {
  return (
    <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/images/ohio.png")' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
      <div className="relative z-10 text-center p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Reach Serious Home Shoppers</h1>
        <p className="mb-6 text-lg">Advertise with Realtor.com and connect with qualified consumers ready for what's next.</p>
        <a 
          href="https://www.realtor.com/mediasolutions/" 
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default AdBanner;