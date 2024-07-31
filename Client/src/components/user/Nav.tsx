// src/components/user/Nav.tsx
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav className="bg-LightdarkBlue p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">HomeMatch</div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded"
          />
          <button className="ml-2 p-2 bg-blue-800 rounded">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;