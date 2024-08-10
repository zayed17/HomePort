// import React, { useState } from 'react'
// import PropertyCard from '../../components/user/PropertyCard';
// import Nav from '../../components/user/Nav';
// import Filters from '../../components/user/Filter';
// import { useGetPropertiesQuery, useToggleFavoriteMutation } from '../../store/propertyApi';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import '../../style/favourite.css';

// interface Property {
//   _id: string;
//   address: string;
//   city: string;
//   mediaFiles: string[];
//   rentAmount: number;
//   totalArea: string;
//   pricePerSqft: string;
//   bedrooms: number;
//   bathrooms: number;
//   sellPrice: number;
//   depositAmount: number;
//   balconies: string;
//   lookingFor: string;
//   description: string;
//   lastUpdated: string;
//   createdBy: {
//     favourites: string[];
//   };
// }

// const PropertyListing: React.FC = () => {
//   const { data: properties = [], isLoading, isError, refetch } = useGetPropertiesQuery();
//   const [updateFavorites] = useToggleFavoriteMutation();
//   const [animatedId, setAnimatedId] = useState<string | null>(null);

//   const handleFavoriteClick = async (propertyId: string, isFavorited: boolean) => {
//     try {
//       setAnimatedId(propertyId);

//       if (isFavorited) {
//         await updateFavorites({ propertyId, action: 'remove' });
//       } else {
//         await updateFavorites({ propertyId, action: 'add' });
//       }
//       refetch();

//       setTimeout(() => setAnimatedId(null), 500); 
//     } catch (error) {
//       console.error('Failed to update favorites', error);
//     }
//   };

//   return (
//     <div>
//       <Nav />
//       <div className="container mx-auto p-4">
//         <div className="flex flex-col lg:flex-row">
//           <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
//             <Filters />
//           </div>
//           <div className="w-full lg:w-3/4 lg:ml-4">
//             {isLoading && (
//               <div className="space-y-4">
//                 {Array.from({ length: 6 }).map((_, index) => (
//                   <div key={index} className="p-4 border rounded shadow">
//                     <Skeleton height={200} />
//                     <Skeleton count={3} className="my-2" />
//                   </div>
//                 ))}
//               </div>
//             )}
//             {isError && (
//               <div className="flex justify-center items-center h-full">
//                 <p className="text-red-500 text-lg">Error fetching properties.</p>
//               </div>
//             )}
//             {!isLoading && !isError && properties.length > 0 ? (
//               <div className="space-y-4">
//                 {properties.map((property: Property) => {
//                   const isFavorited = property.createdBy.favourites.includes(property._id);
//                   const animationClass = animatedId === property._id ? (isFavorited ? 'broken' : 'animated') : '';

//                   return (
//                     <div key={property._id} className="relative">
//                       <PropertyCard
//                         _id={property._id}
//                         image={property.mediaFiles[0] || '/default-image.jpg'}
//                         location={`${property.city}, ${property.address}`}
//                         rentAmount={property.rentAmount}
//                         totalArea={property.totalArea}
//                         bedrooms={property.bedrooms}
//                         bathrooms={property.bathrooms}
//                         balconies={property.balconies}
//                         description={property.description}
//                         lastUpdated={property.lastUpdated}
//                         sellPrice={property.sellPrice}
//                         depositAmount={property.depositAmount}
//                         lookingFor={property.lookingFor}
//                       />
//                       <button
//                         onClick={() => handleFavoriteClick(property._id, isFavorited)}
//                         className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md heart-icon ${animationClass}`}
//                         aria-label={
//                           isFavorited ? 'Remove from favorites' : 'Add to favorites'
//                         }
//                       >
//                         {isFavorited ? (
//                           <FaHeart className="text-red-600" />
//                         ) : (
//                           <FaRegHeart className="text-gray-600" />
//                         )}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="flex justify-center items-center h-full">
//                 <p className="text-gray-500 text-lg">No properties available.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyListing;


import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PropertyCard from '../../components/user/PropertyCard';
import Nav from '../../components/user/Nav';
import Filters from '../../components/user/Filter';
import { useGetPropertiesQuery, useToggleFavoriteMutation } from '../../store/propertyApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../../style/favourite.css';
import { getCookie } from '../../helpers/getCookie';
interface Property {
  _id: string;
  address: string;
  city: string;
  mediaFiles: string[];
  rentAmount: number;
  totalArea: string;
  pricePerSqft: string;
  bedrooms: number;
  bathrooms: number;
  sellPrice: number;
  depositAmount: number;
  balconies: string;
  lookingFor: string;
  description: string;
  lastUpdated: string;
  createdBy?: {
    favourites: string[];
  };
}

const PropertyListing: React.FC = () => {
  const { data: properties = [], isLoading, isError, refetch } = useGetPropertiesQuery();
  const [updateFavorites] = useToggleFavoriteMutation();
  const [animatedId, setAnimatedId] = useState<string | null>(null);

  const isAuthenticated = () => {
    const token = getCookie('token')

    return !!token;
  };

  const handleFavoriteClick = async (propertyId: string, isFavorited: boolean) => {
    if (!isAuthenticated()) {
      toast.error('Please Login for favourite');
      return;
    }

    try {
      setAnimatedId(propertyId);

      if (isFavorited) {
        await updateFavorites({ propertyId, action: 'remove' });
      } else {
        await updateFavorites({ propertyId, action: 'add' });
      }
      refetch();

      setTimeout(() => setAnimatedId(null), 500); 
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
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
                {properties.map((property: Property) => {
                  const isFavorited = isAuthenticated() && property.createdBy?.favourites.includes(property._id);
                  const animationClass = animatedId === property._id ? (isFavorited ? 'broken' : 'animated') : '';

                  return (
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
                        onClick={() => handleFavoriteClick(property._id, isFavorited)}
                        className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md heart-icon ${animationClass}`}
                        aria-label={
                          isFavorited ? 'Remove from favorites' : 'Add to favorites'
                        }
                      >
                        {isFavorited ? (
                          <FaHeart className="text-red-600" />
                        ) : (
                          <FaRegHeart className="text-gray-600" />
                        )}
                      </button>
                    </div>
                  );
                })}
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