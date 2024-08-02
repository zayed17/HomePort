import React, { useState } from 'react';
import PropertyCard from '../../components/user/PropertyCard';
import Nav from '../../components/user/Nav';
import Filters from '../../components/user/Filter';
import { useGetPropertiesQuery } from '../../store/propertyApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Property {
  _id: string;
  address: string;
  city: string;
  mediaFiles: string[];
  rentAmount: number;
  size: string;
  pricePerSqft: string;
  bedrooms: number;
  bathrooms: number;
  balconies: string;
  description: string;
  lastUpdated: string;
}

const PropertyListing: React.FC = () => {
  const { data: properties = [], isLoading, isError } = useGetPropertiesQuery();
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  const handleFavoriteClick = (propertyId: string) => {
    setFavoriteProperties((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <Filters />
          </div>
          <div className="w-full lg:w-3/4 lg:ml-4">
            {isLoading && (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-4 border rounded shadow">
                    <Skeleton height={200} />
                    <Skeleton count={3} className="my-2" />
                  </div>
                ))}
              </div>
            )}
            {isError && (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-lg">Error fetching properties.</p>
              </div>
            )}
            {!isLoading && !isError && properties.length > 0 ? (
              <div className="space-y-4">
                {properties.map((property: Property) => (
                  <div key={property._id} className="relative">
                    <PropertyCard
                    _id={property._id}
                    image={property.mediaFiles[0] || '/default-image.jpg'}
                    location={`${property.city}, ${property.address}`}
                    rentAmount={property.rentAmount}
                    totalArea={property.totalArea}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    balconies={property.balconies}
                    description={property.description}
                    lastUpdated={property.lastUpdated}
                    sellPrice={property.sellPrice}
                    depositAmount={property.depositAmount}
                    lookingFor={property.lookingFor}
                    />
                    <button
                      onClick={() => handleFavoriteClick(property._id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                      aria-label={
                        favoriteProperties.includes(property._id)
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                    >
                      {favoriteProperties.includes(property._id) ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart className="text-gray-600" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">No properties available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;