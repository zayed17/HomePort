// import { useState } from 'react';
// import { Button, Input, Select, Space, Typography, Drawer } from 'antd';
// import { CheckOutlined, CloseOutlined, FilterOutlined } from '@ant-design/icons';

// const { Title } = Typography;
// const { Option } = Select;

// interface FiltersProps {
//   onFilterChange: (newFilters: any) => void;
// }

// const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
//   const [lookingFor, setLookingFor] = useState('any');
//   const [priceRange, setPriceRange] = useState([0, 100000000]);
//   const [propertyType, setPropertyType] = useState('Any');
//   const [bedrooms, setBedrooms] = useState('Any');
//   const [furnisherType, setFurnisherType] = useState('Any');
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const applyFilters = () => {
//     onFilterChange({
//       lookingFor,
//       priceRange,
//       propertyType,
//       bedrooms,
//       furnisherType,
//     });
//     setDrawerVisible(false);
//   };

//   const clearFilters = () => {
//     setLookingFor('any');
//     setPriceRange([0, 100000000]);
//     setPropertyType('Any');
//     setBedrooms('Any');
//     setFurnisherType('Any');
//     onFilterChange({
//       lookingFor: 'any',
//       priceRange: [0, 100000000],
//       propertyType: 'Any',
//       bedrooms: 'Any',
//       furnisherType: 'Any',
//     });
//     setDrawerVisible(false);
//   };

//   return (
//     <>
//       <Button className="block md:hidden mb-4 w-full" type="primary" icon={<FilterOutlined />} onClick={() => setDrawerVisible(true)} >
//         Filters
//       </Button>

//       <Drawer title="Property Filters" placement="top" closable onClose={() => setDrawerVisible(false)}visible={drawerVisible} bodyStyle={{ paddingBottom: 20 }} className="md:hidden" >
//         {filterContent()}
//       </Drawer>

//       <div className="hidden md:block bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-xs">
//         <Title level={3} className="text-center mb-6 text-gray-800">
//           Property Filters
//         </Title>
//         {filterContent()}
//       </div>
//     </>
//   );

//   function filterContent() {
//     return (
//       <>
//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">Property For</label>
//           <Space wrap>
//             {['Any', 'Rent', 'Sell'].map((option) => (
//               <Button
//                 key={option}
//                 type={lookingFor === option.toLowerCase() ? 'primary' : 'default'}
//                 shape="round"
//                 onClick={() => setLookingFor(option.toLowerCase())}
//                 className="capitalize"
//               >
//                 {option}
//               </Button>
//             ))}
//           </Space>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">
//             {lookingFor === 'rent' ? 'Monthly Rent' : 'Price'} Range
//           </label>
//           <Space>
//             <Input
//               type="number"
//               className="w-full p-2 rounded-md"
//               placeholder="Min"
//               value={priceRange[0]}
//               onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
//             />
//             <span className="text-gray-500">to</span>
//             <Input
//               type="number"
//               className="w-full p-2 rounded-md"
//               placeholder="Max"
//               value={priceRange[1]}
//               onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000000])}
//             />
//           </Space>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">Property Type</label>
//           <Select
//             className="w-full"
//             value={propertyType}
//             onChange={(value) => setPropertyType(value)}
//             popupClassName="bg-white"
//           >
//             <Option value="Any">Any</Option>
//             <Option value="Apartment/Flat">Apartment/Flat</Option>
//             <Option value="Independent Villa/House">Independent Villa/House</Option>
//             <Option value="Gated Community Villa">Gated Community Villa</Option>
//           </Select>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">Bedrooms</label>
//           <Space wrap>
//             {['Any', 1, 2, 3, 4, '5+'].map((num: any) => (
//               <Button
//                 key={num}
//                 type={bedrooms === num ? 'primary' : 'default'}
//                 shape="round"
//                 onClick={() => setBedrooms(num)}
//                 className="capitalize"
//               >
//                 {num} {num !== 'Any' && 'BHK'}
//               </Button>
//             ))}
//           </Space>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-700">Furnishing Status</label>
//           <Space wrap>
//             {['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
//               <Button
//                 key={status}
//                 type={furnisherType === status ? 'primary' : 'default'}
//                 shape="round"
//                 onClick={() => setFurnisherType(status)}
//                 className="capitalize"
//               >
//                 {status}
//               </Button>
//             ))}
//           </Space>
//         </div>

//         <div className="flex gap-2">
//           <Button onClick={clearFilters} type="default" icon={<CloseOutlined />} className="rounded-lg flex-1">
//             Clear Filters
//           </Button>

//           <Button onClick={applyFilters} type="primary" icon={<CheckOutlined />} className="rounded-lg flex-1">
//             Apply Filters
//           </Button>
//         </div>
//       </>
//     );
//   }
// };

// export default Filters;



import  { useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
interface FiltersProps {
  onFilterChange: (newFilters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [lookingFor, setLookingFor] = useState('any');
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

  const clearFilters = () => {
    setLookingFor('any');
    setPriceRange([0, 100000000]);
    setPropertyType('Any');
    setBedrooms('Any');
    setFurnisherType('Any');
    onFilterChange({
      lookingFor: 'any',
      priceRange: [0, 100000000],
      propertyType: 'Any',
      bedrooms: 'Any',
      furnisherType: 'Any',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <Title level={3} className="text-center mb-6 text-gray-800">Property Filters</Title>
      
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Property For</label>
        <Space wrap>
          {['Any', 'Rent', 'Sell'].map((option) => (
            <Button 
              key={option}
              type={lookingFor === option.toLowerCase() ? 'primary' : 'default'}
              shape="round"
              onClick={() => setLookingFor(option.toLowerCase())}
              className="capitalize"
            >
              {option}
            </Button>
          ))}
        </Space>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          {lookingFor === 'rent' ? 'Monthly Rent' : 'Price'} Range
        </label>
        <Space>
          <Input 
            type="number" 
            className="w-full p-2 rounded-md"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
          />
          <span className="text-gray-500">to</span>
          <Input 
            type="number" 
            className="w-full p-2 rounded-md"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000000])}
          />
        </Space>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Property Type</label>
        <Select 
          className="w-full"
          value={propertyType}
          onChange={(value) => setPropertyType(value)}
          popupClassName="bg-white"
        >
          <Option value="Any">Any</Option>
          <Option value="Apartment/Flat">Apartment/Flat</Option>
          <Option value="Independent Villa/House">Independent Villa/House</Option>
          <Option value="Gated Community Villa">Gated Community Villa</Option>
        </Select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Bedrooms</label>
        <Space wrap>
          {['Any', 1, 2, 3, 4, '5+'].map((num:any) => (
            <Button 
              key={num}
              type={bedrooms === num ? 'primary' : 'default'}
              shape="round"
              onClick={() => setBedrooms(num)}
              className="capitalize"
            >
              {num} {num !== 'Any' && 'BHK'}
            </Button>
          ))}
        </Space>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Furnishing Status</label>
        <Space wrap>
          {['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
            <Button 
              key={status}
              type={furnisherType === status ? 'primary' : 'default'}
              shape="round"
              onClick={() => setFurnisherType(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </Space>
      </div>

      <div className='flex gap-2'>
        <Button 
          onClick={clearFilters}
          type="dashed"
          icon={<CloseOutlined />}
          className="rounded-lg flex-1"
        >
          Clear Filters
        </Button>

        <Button 
          onClick={applyFilters}
          type="primary"
          icon={<CheckOutlined />}
          className="rounded-lg flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
