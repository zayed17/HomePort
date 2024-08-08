import React, { ChangeEvent, useState } from 'react';

interface SelectButtonProps {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const SelectButton:React.FC<SelectButtonProps> = ({ options, selectedValue, onChange }) => (
  <div className="flex flex-wrap gap-4">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onChange(option)}
        className={`px-4 py-2 rounded-full ${selectedValue === option ? 'bg-LightdarkBlue text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        {option}
      </button>
    ))}
  </div>
);

interface TextInputProps {
  label?:string; 
  type:string;
  name:string;
  value:string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder:string
}

export const TextInput: React.FC<TextInputProps> = ({ label, type,name, value, onChange, placeholder }) => (
    <>
      <label className="block text-gray-700 mb-2 font-semibold text-lg">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        placeholder={placeholder}
      />
    </>
  );

  export const propertyTypes = ['Apartment/Flat', 'Independent Villa/House', 'Gated Community Villa'];
  export const propertyFacings = ['North', 'South', 'East', 'West', 'North-East', 'South-East', 'North-West', 'South-West'];
  export const propertyAges = ['0-2 Years', '2-5 Years', '5-10 Years', '10+ Years'];
  export const furnisherTypes = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
  export const electronicsList = ['Lights','Fans','AC','Chair','Sofa','Bed','Table','Wardrobe'];
  export const hasWell = ['Yes', 'No'];  
  export const otherRoomsOptions = ['Prayer Room', 'Study Room', 'Game Room', 'Guest Room', 'Theater Room', 'Store Room', 'Library Room', 'Office Room'];
  export const propertyFeatures = ['High Speed Network', 'Clear Water', '24*7 water', 'Private Pool', 'Private Garden', 'Rain Water Harvesting'];
  export const propertyAdvantages = ['Near to Metro', 'Near to School', 'Near to Highway', 'Near to Hospital', 'Near to Bank', 'Near to Mall', 'Near to Airport'];

  interface MultipleSelectWithCustomOptionProps {
    initialOptions: string[];
    selectedValues: string[];
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
  }
  
  export const MultipleSelectWithCustomOption: React.FC<MultipleSelectWithCustomOptionProps> = ({
    initialOptions,
    selectedValues,
    onChange,
    placeholder = "Add other"
  }) => {
    const [customOption, setCustomOption] = useState<string>('');
    const [options, setOptions] = useState<string[]>(initialOptions);
  
    const toggleOption = (option: string) => {
      const isSelected = selectedValues.includes(option);
      const newSelectedValues = isSelected
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
  
      onChange(newSelectedValues);
    };
  
    const handleCustomOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCustomOption(e.target.value);
    };
  
    const addCustomOption = () => {
      if (customOption && !options.includes(customOption)) {
        setOptions([...options, customOption]);
        setCustomOption('');
      }
    };
  
    return (
      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className={`px-4 py-2 rounded-full ${
                selectedValues.includes(option) ? 'bg-LightdarkBlue text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
          <input
            type="text"
            value={customOption}
            onChange={handleCustomOptionChange}
            className="p-2 border rounded-full flex-1 mr-2"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={addCustomOption}
            className="px-4 py-2  bg-LightdarkBlue text-white rounded"
          >
            Add
          </button>
        </div>
    );
  };