import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import PropertyCard from '../../components/user/PropertyCard';
import Nav from '../../components/user/Nav';
import Filters from '../../components/user/Filter';
import { useGetPropertiesQuery, useGetPublicPropertiesQuery, useToggleFavoriteMutation } from '../../store/property/propertyApi';
import { Pagination, Skeleton, Badge, Button, Input, Select, Modal, Tooltip } from 'antd';
import { FaHeart, FaRegHeart, FaMap } from 'react-icons/fa';
import { getCookie } from '../../helpers/getCookie';
import MapWithProperties from '../../components/user/MapShow';


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
  const [currentPage, setCurrentPage] = useState(1);
  const isAuthenticated = (): boolean => !!token;
  const [pageSize] = useState<number>(3);
  const { data, isLoading, isError } = isAuthenticated() ? useGetPropertiesQuery({ page: currentPage, limit: pageSize}) : useGetPublicPropertiesQuery({ page: currentPage, limit: pageSize});

  console.log(data,"chdleof")
  const properties = data?.properties || [];
  const totalProperties = data?.total || 0;
  const [updateFavorites] = useToggleFavoriteMutation();
  const [animatedId, setAnimatedId] = useState<string | null>(null);
  // const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMapClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  // useEffect(() => {
  //   let result = [...properties];

  //   if (filters.lookingFor && filters.lookingFor !== 'any') {
  //     result = result.filter((property: Property) => property.lookingFor === filters.lookingFor);
  //   }
  //   if (filters.priceRange) {
  //     result = result.filter((property: Property) =>
  //       (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) >= filters.priceRange![0] &&
  //       (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) <= filters.priceRange![1]
  //     );
  //   }
  //   if (filters.propertyType && filters.propertyType !== 'Any') {
  //     result = result.filter((property: Property) => property.propertyType === filters.propertyType);
  //   }
  //   if (filters.bedrooms && filters.bedrooms !== 'Any') {
  //     result = result.filter((property: Property) => property.bedrooms === filters.bedrooms);
  //   }
  //   if (filters.furnisherType && filters.furnisherType !== 'Any') {
  //     result = result.filter((property: Property) => property.furnisherType === filters.furnisherType);
  //   }
  //   if (searchTerm) {
  //     result = result.filter((property: Property) =>
  //       property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       property.city.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (sortOption === 'priceAsc') {
  //     result = result.sort((a: Property, b: Property) =>
  //       (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice) - (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice)
  //     );
  //   } else if (sortOption === 'priceDesc') {
  //     result = result.sort((a: Property, b: Property) =>
  //       (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice) - (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice)
  //     );
  //   }

  //   setFilteredProperties(result);
  // }, [properties, filters, searchTerm, sortOption]);


  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.lookingFor && filters.lookingFor !== 'any') {
      result = result.filter((property) => property.lookingFor === filters.lookingFor);
    }
    if (filters.priceRange) {
      result = result.filter((property) =>
        (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) >= filters.priceRange![0] &&
        (property.lookingFor === 'rent' ? property.rentAmount : property.sellPrice) <= filters.priceRange![1]
      );
    }
    if (filters.propertyType && filters.propertyType !== 'Any') {
      result = result.filter((property) => property.propertyType === filters.propertyType);
    }
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      result = result.filter((property) => property.bedrooms === filters.bedrooms);
    }
    if (filters.furnisherType && filters.furnisherType !== 'Any') {
      result = result.filter((property) => property.furnisherType === filters.furnisherType);
    }
    if (searchTerm) {
      result = result.filter((property) =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'priceAsc') {
      result.sort((a, b) =>
        (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice) - (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice)
      );
    } else if (sortOption === 'priceDesc') {
      result.sort((a, b) =>
        (b.lookingFor === 'rent' ? b.rentAmount : b.sellPrice) - (a.lookingFor === 'rent' ? a.rentAmount : a.sellPrice)
      );
    }

    return result;
  }, [properties, filters, searchTerm, sortOption]);


  const handleFavoriteClick = async (propertyId: string, isFavorited: any): Promise<void> => {
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
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <Select value={sortOption} onChange={(value) => setSortOption(value)} className="w-1/6">
            <Option value="default">Default Sort</Option>
            <Option value="priceAsc">Price: Low to High</Option>
            <Option value="priceDesc">Price: High to Low</Option>
          </Select>
          <Input.Search
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2"
            enterButton
          />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <Filters onFilterChange={handleFilterChange} />
          </div>
          <div className="w-full lg:w-3/4 lg:ml-4">
            {(isLoading || isError) ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-4 border rounded shadow">
                    <Skeleton active />
                  </div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <div className="space-y-4">
                  {filteredProperties.map((property) => {
                    const isFavorited = isAuthenticated() && property.createdBy?.favourites.includes(property._id);
                    const animationClass = animatedId === property._id ? (isFavorited ? 'broken' : 'animated') : '';
                    return (
                      <Badge.Ribbon key={property._id} text="Sponsored" color="darkBlue" className={property.sponsorship?.isSponsored ? 'visible' : 'invisible'} >
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
                    pageSize={pageSize}
                    total={totalProperties}
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
      <Modal
        title="View Properties on Map"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        style={{ top: 20 }}
      >
        <MapWithProperties />
      </Modal>

      <div className="fixed bottom-4 right-4 flex items-center space-x-3 z-50 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow">
        <Tooltip title="Show properties on map">
          <Button icon={<FaMap className="text-blue-700 text-4xl" />}
            className="bg-blue-200 text-blue-700 rounded-full p-4 shadow-lg hover:bg-blue-300 transition-colors"
            onClick={handleMapClick}
          />
        </Tooltip>
      </div>


    </>


  );
};

export default PropertyListing;










