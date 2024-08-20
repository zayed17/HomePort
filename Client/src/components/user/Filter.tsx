// import React from 'react';

// const Filters: React.FC = () => {
//   return (
//     <div className="bg-gray-100 p-4 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Filters</h2>
//       <div className="mb-4">
//         <label className="block mb-2">Budget</label>
//         <input type="range" className="w-full" min="0" max="20000000" />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Type of property</label>
//         <select className="w-full p-2 border rounded">
//           <option>Apartment / Flat</option>
//           <option>Independent House / Villa</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Number of Rooms</label>
//         <input type="number" className="w-full p-2 border rounded" min="1" max="10" />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Furnishing status</label>
//         <div>
//           <label className="mr-4">
//             <input type="radio" name="furnishing" value="furnished" /> Furnished
//           </label>
//           <label className="mr-4">
//             <input type="radio" name="furnishing" value="semi-furnished" /> Semi-Furnished
//           </label>
//           <label>
//             <input type="radio" name="furnishing" value="unfurnished" /> Un-Furnished
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;


// import React, { useState } from 'react';

// const Filters: React.FC = () => {
//   const [propertyType, setPropertyType] = useState('rent');
//   const [priceRange, setPriceRange] = useState([0, 20000000]);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Property Filters</h2>
      
//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">Property For</label>
//         <div className="flex space-x-4">
//           <button 
//             className={`px-4 py-2 rounded-full ${propertyType === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//             onClick={() => setPropertyType('rent')}
//           >
//             Rent
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-full ${propertyType === 'sale' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//             onClick={() => setPropertyType('sale')}
//           >
//             Sale
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">
//           {propertyType === 'rent' ? 'Monthly Rent' : 'Price'} Range
//         </label>
//         <div className="flex items-center space-x-4">
//           <input 
//             type="number" 
//             className="w-1/2 p-2 border rounded" 
//             placeholder="Min"
//             value={priceRange[0]}
//             onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
//           />
//           <span>to</span>
//           <input 
//             type="number" 
//             className="w-1/2 p-2 border rounded" 
//             placeholder="Max"
//             value={priceRange[1]}
//             onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//           />
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">Property Type</label>
//         <select className="w-full p-2 border rounded bg-white">
//           <option>Any</option>
//           <option>Apartment / Flat</option>
//           <option>Independent House / Villa</option>
//           <option>Plot / Land</option>
//           <option>Commercial Property</option>
//         </select>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">Bedrooms</label>
//         <div className="flex flex-wrap gap-2">
//           {[1, 2, 3, 4, '5+'].map((num) => (
//             <button key={num} className="px-4 py-2 border rounded-full hover:bg-blue-500 hover:text-white">
//               {num} BHK
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">Furnishing Status</label>
//         <div className="flex flex-wrap gap-2">
//           {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
//             <button key={status} className="px-4 py-2 border rounded-full hover:bg-blue-500 hover:text-white">
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold text-gray-700">Additional Filters</label>
//         <div className="space-y-2">
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" /> Parking
//           </label>
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" /> Pet Friendly
//           </label>
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" /> Gym
//           </label>
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" /> Swimming Pool
//           </label>
//         </div>
//       </div>

//       <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
//         Apply Filters
//       </button>
//     </div>
//   );
// };

// export default Filters;


import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [lookingFor, setLookingFor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [propertyType, setPropertyType] = useState('Any');
  const [bedrooms, setBedrooms] = useState('Any');
  const [furnisherType, setFurnisherType] = useState('Any');
  const applyFilters = () => {
    onFilterChange({
      lookingFor,
      priceRange,
      propertyType,
      bedrooms,
      furnisherType,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Property Filters</h2>
      
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Property For</label>
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-full ${lookingFor === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLookingFor('rent')}
          >
            Rent
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${lookingFor === 'sell' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLookingFor('sell')}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          {lookingFor === 'rent' ? 'Monthly Rent' : 'Price'} Range
        </label>
        <div className="flex items-center space-x-4">
          <input 
            type="number" 
            className="w-1/2 p-2 border rounded" 
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <span>to</span>
          <input 
            type="number" 
            className="w-1/2 p-2 border rounded" 
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Property Type</label>
        <select 
          className="w-full p-2 border rounded bg-white"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}>
          <option value="Any">Any</option>
          <option value="Apartment/Flat">Apartment/Flat</option>
          <option value="Independent Villa/House">Independent Villa/House</option>
          <option value="Gated Community Villa">Gated Community Villa</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Bedrooms</label>
        <div className="flex flex-wrap gap-2">
          {['Any', 1, 2, 3, 4, '5+'].map((num) => (
            <button 
              key={num} 
              className={`px-4 py-2 border rounded-full ${bedrooms === num ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
              onClick={() => setBedrooms(num)}
            >
              {num} {num !== 'Any' && 'BHK'}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Furnishing Status</label>
        <div className="flex flex-wrap gap-2">
          {['Any','Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
            <button 
              key={status} 
              className={`px-4 py-2 border rounded-full ${furnisherType === status ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
              onClick={() => setFurnisherType(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;