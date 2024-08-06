import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPropertiesQuery } from '../../../../store/propertyApi';

interface Property {
  _id: string;
  propertyType: string;
  city: string;
  rentAmount?: number;
  depositAmount?: number;
  sellPrice?: number;
  status: string;
  mediaFiles: string[];
  totalArea?: number;
  sponsorship?: {
    isSponsored: boolean;
  };
}

const Properties = () => {
  const navigate = useNavigate();
  const { data: properties = [], error, isLoading } = useGetAllPropertiesQuery();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (properties) {
      setFilteredProperties(properties);
    }
  }, [properties]);

  const handleNavigate = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleSponsorNavigate = (id: string) => {
    navigate(`/sponsor/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-6">My Listed Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              onClick={() => handleNavigate(property._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              aria-label={`View details of ${property.propertyType} in ${property.city}`}
            >
              <div className="relative h-40">
                <img
                  src={property.mediaFiles[0] || '/placeholder.jpg'}
                  alt={property.propertyType}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
                {property.sponsorship?.isSponsored && (
                  <span
                    className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800"
                  >
                    Sponsored
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{property.propertyType}</h2>
                <p className="text-sm text-gray-600">{property.city}</p>
                
                {property.rentAmount && (
                  <>
                    <div className="mt-2 text-sm font-medium text-green-600">
                      ₹{property.rentAmount.toLocaleString('en-IN')} / month
                    </div>
                    <p className="text-xs text-gray-500">
                      Deposit: ₹{property.depositAmount?.toLocaleString('en-IN')}
                    </p>
                  </>
                )}
                {property.sellPrice && (
                  <>
                    <div className="mt-2 text-sm font-medium text-green-600">
                      ₹{property.sellPrice.toLocaleString('en-IN')} 
                    </div>
                  </>
                )}
                
                {property.totalArea && (
                  <p className="text-xs text-gray-500">Area: {property.totalArea} sq ft</p>
                )}

                {!property.sponsorship?.isSponsored && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent div's onClick
                      handleSponsorNavigate(property._id);
                    }}
                    className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Make Sponsored
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No properties found</div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-200 text-green-600';
    case 'rejected':
      return 'bg-red-200 text-red-600';
    case 'pending':
      return 'bg-blue-200 text-blue-600';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

export default Properties;