import React from 'react';



const Loader: React.FC = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <iframe
          src="https://lottie.host/embed/48c644bb-56f7-4f99-a30b-7d0d8f499863/J56XVi7HQR.json"
          style={{ width: '300px', height: '300px', border: 'none' }}
          title="Loading Animation"
        ></iframe>
      </div>
    );
  }

  

export default Loader;
