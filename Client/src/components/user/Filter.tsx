// src/components/user/Filter.tsx
import React from 'react';

const Filters: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block mb-2">Budget</label>
        <input type="range" className="w-full" min="0" max="20000000" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Type of property</label>
        <select className="w-full p-2 border rounded">
          <option>Apartment / Flat</option>
          <option>Independent House / Villa</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Rooms</label>
        <input type="number" className="w-full p-2 border rounded" min="1" max="10" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Furnishing status</label>
        <div>
          <label className="mr-4">
            <input type="radio" name="furnishing" value="furnished" /> Furnished
          </label>
          <label className="mr-4">
            <input type="radio" name="furnishing" value="semi-furnished" /> Semi-Furnished
          </label>
          <label>
            <input type="radio" name="furnishing" value="unfurnished" /> Un-Furnished
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;