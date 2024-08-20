// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import PropertyCard from '../../components/user/PropertyCard';
// import Nav from '../../components/user/Nav';
// import Filters from '../../components/user/Filter';
// import { useGetPropertiesQuery, useToggleFavoriteMutation } from '../../store/propertyApi';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { getCookie } from '../../helpers/getCookie';

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
//   sponsorship?: {
//     isSponsored: boolean;
//   };
//   createdBy?: {
//     favourites: string[];
//   };
// }



// const PropertyListing: React.FC = () => {
//   const { data: properties = [], isLoading, isError } = useGetPropertiesQuery();
//   const [updateFavorites] = useToggleFavoriteMutation();
//   const [animatedId, setAnimatedId] = useState<string | null>(null);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4);

//   const indexOfLastProperty = currentPage * itemsPerPage;
//   const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
//   const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

//   const totalPages = Math.ceil(properties.length / itemsPerPage);

//   const isAuthenticated = () => {
//     const token = getCookie('token');
//     return !!token;
//   };

//   const handleFavoriteClick = async (propertyId: string, isFavorited: boolean) => {
//     if (!isAuthenticated()) {
//       toast.error('Please Login to favorite');
//       return;
//     }

//     try {
//       setAnimatedId(propertyId);

//       if (isFavorited) {
//         await updateFavorites({ propertyId, action: 'remove' });
//       } else {
//         await updateFavorites({ propertyId, action: 'add' });
//       }
      
//       setTimeout(() => setAnimatedId(null), 500);
//     } catch (error) {
//       console.error('Failed to update favorites', error);
//     }
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
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
//             {!isLoading && !isError && currentProperties.length > 0 ? (
//               <>
//                 <div className="space-y-4">
//                   {currentProperties.map((property: Property) => {
//                     const isFavorited = isAuthenticated() && property.createdBy?.favourites.includes(property._id);
//                     const animationClass = animatedId === property._id ? (isFavorited ? 'broken' : 'animated') : '';

//                     return (
//                       <div key={property._id} className="relative">
//                         {property.sponsorship?.isSponsored && (
//                           <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg transform -rotate-12 z-10">
//                             <span className="text-xs font-bold uppercase tracking-wide flex items-center">
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                               Sponsored
//                             </span>
//                           </div>
//                         )}
//                         <PropertyCard
//                           _id={property._id}
//                           image={property.mediaFiles[0] || '/default-image.jpg'}
//                           location={`${property.city}, ${property.address}`}
//                           rentAmount={property.rentAmount}
//                           totalArea={property.totalArea}
//                           bedrooms={property.bedrooms}
//                           bathrooms={property.bathrooms}
//                           balconies={property.balconies}
//                           description={property.description}
//                           lastUpdated={property.lastUpdated}
//                           sellPrice={property.sellPrice}
//                           depositAmount={property.depositAmount}
//                           lookingFor={property.lookingFor}
//                         />
//                         <button
//                           onClick={() => handleFavoriteClick(property._id, isFavorited)}
//                           className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md heart-icon ${animationClass}`}
//                           aria-label={
//                             isFavorited ? 'Remove from favorites' : 'Add to favorites'
//                           }
//                         >
//                           {isFavorited ? (
//                             <FaHeart className="text-red-600" />
//                           ) : (
//                             <FaRegHeart className="text-gray-600" />
//                           )}
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="flex justify-center mt-4">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l"
//                   >
//                     Previous
//                   </button>
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handlePageChange(index + 1)}
//                       className={`px-4 py-2 ${index + 1 === currentPage ? 'bg-LightdarkBlue text-white' : 'bg-gray-200 text-gray-600'}`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
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

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropertyCard from '../../components/user/PropertyCard';
import Nav from '../../components/user/Nav';
import Filters from '../../components/user/Filter';
import { useGetPropertiesQuery, useToggleFavoriteMutation } from '../../store/propertyApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
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
  sponsorship?: {
    isSponsored: boolean;
  };
  createdBy?: {
    favourites: string[];
  };
  propertyType?: string;
  furnisherType?: string;
}

interface FilterState {
  lookingFor?: string;
  priceRange?: [number, number];
  propertyType?: string;
  bedrooms?: number | string;
  furnisherType?: string;
}

const PropertyListing: React.FC = () => {
  const { data: allProperties = [], isLoading, isError } = useGetPropertiesQuery({});
  const [updateFavorites] = useToggleFavoriteMutation();
  const [animatedId, setAnimatedId] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({});

  useEffect(() => {
    console.log(allProperties,"checking")
    let result = allProperties;
    
    if (filters.lookingFor) {
      result = result.filter((property: Property) => property.lookingFor === filters.lookingFor);
    }
    if (filters.priceRange) {
      result = result.filter((property: Property) => 
        (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) >= filters.priceRange![0] && 
        (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) <= filters.priceRange![1]
      );
    }
    if (filters.propertyType && filters.propertyType !== 'Any') {
      result = result.filter((property: Property) => property.propertyType === filters.propertyType);
    }
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      result = result.filter((property: Property) => property.bedrooms === filters.bedrooms);
    }
    if (filters.furnisherType && filters.furnisherType !== 'Any') {
      result = result.filter((property: Property) => property.furnisherType === filters.furnisherType);
    }
    if (searchTerm) {
      result = result.filter((property: Property) => 
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'priceAsc') {
      result.sort((a: Property, b: Property) => (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice) - (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice));
    } else if (sortOption === 'priceDesc') {
      result.sort((a: Property, b: Property) => (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice) - (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice));
    }

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [allProperties, filters, searchTerm, sortOption]);

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const isAuthenticated = (): boolean => {
    const token = getCookie('token');
    return !!token;
  };

  const handleFavoriteClick = async (propertyId: string, isFavorited: boolean): Promise<void> => {
    if (!isAuthenticated()) {
      toast.error('Please Login to favorite');
      return;
    }

    try {
      setAnimatedId(propertyId);

      if (isFavorited) {
        await updateFavorites({ propertyId, action: 'remove' });
      } else {
        await updateFavorites({ propertyId, action: 'add' });
      }
      
      setTimeout(() => setAnimatedId(null), 500);
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilters: FilterState): void => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
          <select
            value={sortOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="default">Default Sort</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <Filters onFilterChange={handleFilterChange} />
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
            {!isLoading && !isError && currentProperties.length > 0 ? (
              <>
                <div className="space-y-4">
                  {currentProperties.map((property: Property) => {
                    const isFavorited = isAuthenticated() && property.createdBy?.favourites.includes(property._id);
                    const animationClass = animatedId === property._id ? (isFavorited ? 'broken' : 'animated') : '';

                    return (
                      <div key={property._id} className="relative">
                        {property.sponsorship?.isSponsored && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg transform -rotate-12 z-10">
                            <span className="text-xs font-bold uppercase tracking-wide flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Sponsored
                            </span>
                          </div>
                        )}
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

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 ${index + 1 === currentPage ? 'bg-LightdarkBlue text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </>
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