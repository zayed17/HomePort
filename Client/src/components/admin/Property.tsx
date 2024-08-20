import { useEffect, useState } from 'react';
import { useGetAdminPropertiesQuery, useBlockAndUnblockMutation } from '../../store/propertyApi';

interface Property {
  _id: string;
  propertyType: string;
  address: string;
  lookingFor: string;
  totalArea: number;
  rentAmount: number;
  sellPrice?: number;
  status: string;
  eligibility: string;
  isBlock: boolean;
  noOfReports: number; 
}

const PropertyList = () => {
  const [BlockUnblock] = useBlockAndUnblockMutation();
  const { data: properties = [], error, isLoading, refetch } = useGetAdminPropertiesQuery({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [viewType, setViewType] = useState<'rent' | 'sell'>('rent');

  useEffect(() => {
    if (properties) {
      setFilteredProperties(properties);
    }
  }, [properties]);

  useEffect(() => {
    setFilteredProperties(
      properties.filter(property =>
        property.lookingFor === viewType &&
        (property.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.totalArea.toString().includes(searchTerm) ||
          (property.rentAmount && property.rentAmount.toString().includes(searchTerm)) ||
          (property.sellPrice && property.sellPrice.toString().includes(searchTerm)))
      )
    );
  }, [searchTerm, properties, viewType]);

  const handleBLockUnblock = async (propertyId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await BlockUnblock({ _id: propertyId, newStatus });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Property List</h1>

      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={() => setViewType('rent')}
            className={`px-4 py-2 rounded-lg ${viewType === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Rent
          </button>
          <button
            onClick={() => setViewType('sell')}
            className={`ml-4 px-4 py-2 rounded-lg ${viewType === 'sell' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Sell
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">{viewType === 'rent' ? 'Rent Amount' : 'Sell Price'}</th>
              <th className="py-3 px-6 text-left">Area</th>
              <th className="py-3 px-6 text-center">Eligibility</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">No. of Reports</th> {/* Added No. of Reports column */}
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <tr key={property._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{property.propertyType}</td>
                  <td className="py-3 px-6 text-left">{property.address}</td>
                  <td className="py-3 px-6 text-left">{viewType === 'rent' ? property.rentAmount : property.sellPrice}</td>
                  <td className="py-3 px-6 text-left">{property.totalArea} sq ft</td>
                  <td className="py-3 px-6 text-center">{property.eligibility}</td>
                  <td className="py-3 px-6 text-center">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">{property.noOfReports}</td> {/* Display noOfReports */}
                  <td className="py-3 px-6 text-center">
                    <span onClick={() => handleBLockUnblock(property._id, property.isBlock)} className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${property.isBlock ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                      {property.isBlock ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-4 px-6 text-center">No properties found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
      return 'bg-green-200 text-green-600';
    case 'rejected':
      return 'bg-red-200 text-red-600';
    case 'pending':
      return 'bg-blue-200 text-blue-600';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

export default PropertyList;