import React from 'react';
import { useGetFavouritesQuery } from '../../store/propertyApi';

const FavoriteCard: React.FC = () => {
const { data: properties = [], isLoading, isError, error } = useGetFavouritesQuery();
console.log(properties,"for chienc")
  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-4 text-red-500">"error.message"</div>;
  }

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Favorite Properties</h1>
    <div className="flex flex-wrap gap-4">
      {properties.map((property: any) => (
        <div key={property._id} className="border border-gray-300 rounded-lg shadow-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          {property.mediaFiles.length > 0 && (
            <img src={property.mediaFiles[0]} alt={property.propertyType} className="w-full h-40 object-cover rounded-md mb-2" />
          )}
          <h2 className="text-xl font-semibold mb-1">{property.propertyType}</h2>
          <p className="text-gray-600 mb-1">{property.address}, {property.city}</p>
          <p className="text-green-500 font-semibold mb-2">${property.rentAmount.toLocaleString()}</p>
          <p className="text-gray-700">{property.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default FavoriteCard;