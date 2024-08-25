import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropertyCard from '../../components/user/PropertyCard';
import Nav from '../../components/user/Nav';
import Filters from '../../components/user/Filter';
import { useGetPropertiesQuery, useGetPublicPropertiesQuery, useToggleFavoriteMutation } from '../../store/propertyApi';
import { Pagination, Skeleton, Badge, Button, Input, Select } from 'antd';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { getCookie } from '../../helpers/getCookie';

const { Option } = Select;

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
  const token = getCookie('token');
  const isAuthenticated = (): boolean => !!token;
  const { data: allProperties = [], isLoading, isError } = isAuthenticated()
    ? useGetPropertiesQuery({})
    : useGetPublicPropertiesQuery({});
  const [updateFavorites] = useToggleFavoriteMutation();
  const [animatedId, setAnimatedId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({});

  useEffect(() => {
    let result = [...allProperties];

    if (filters.lookingFor && filters.lookingFor !== 'any') {
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
      result = result.sort((a: Property, b: Property) =>
        (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice) - (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice)
      );
    } else if (sortOption === 'priceDesc') {
      result = result.sort((a: Property, b: Property) =>
        (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice) - (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice)
      );
    }

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [allProperties, filters, searchTerm, sortOption]);

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

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
          <Input.Search
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2"
            enterButton
          />
          <Select
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            className="w-1/4"
          >
            <Option value="default">Default Sort</Option>
            <Option value="priceAsc">Price: Low to High</Option>
            <Option value="priceDesc">Price: High to Low</Option>
          </Select>
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
                    <Skeleton active />
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
                      <Badge.Ribbon
                      key={property._id}
                      text="Sponsored"
                      color="purple"
                      className={property.sponsorship?.isSponsored ? 'visible' : 'invisible'}
                    >
                      <div className="relative">
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
                        <Button
                          onClick={() => handleFavoriteClick(property._id, isFavorited)}
                          shape="circle"
                          icon={isFavorited ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-gray-600" />}
                          className={`absolute top-10 right-2 heart-icon ${animationClass}`} 
                          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                        />
                      </div>
                    </Badge.Ribbon>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-4">
                  <Pagination
                    current={currentPage}
                    total={filteredProperties.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">No properties found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;




