import React, { useState, useEffect, useRef } from 'react';
import { useSearchBoxCore, SearchBoxSuggestion } from '@mapbox/search-js-react';
import { checkDomainOfScale } from 'recharts/types/util/ChartUtils';

const MapboxToken = 'pk.eyJ1IjoiemF5ZWQxNyIsImEiOiJjbHpqbnl5d3YwdHJsMmpzaXRkcHc1NW55In0.C91Rt8F6i6zkC2mHGqubcg';

interface Suggestion {
  placeName: string;
  coordinates: [number, number];
}

const PlaceSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentFocus, setCurrentFocus] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  const searchBoxCore = useSearchBoxCore({
    accessToken: MapboxToken,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
  
    if (query.length > 2) {
      try {
        const response = await searchBoxCore.suggest(query, {
          sessionToken: 'test-123',
        });
  
        console.log(response,"cheinc")
        if (response.suggestions) {
          setSuggestions(
            response.suggestions
              .filter((suggestion: SearchBoxSuggestion) => suggestion.geometry) // Ensure geometry is defined
              .map((suggestion: SearchBoxSuggestion) => ({
                placeName: suggestion.text,
                coordinates: suggestion.geometry?.coordinates || [0, 0], 
              }))
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (placeName: string, coordinates: [number, number]) => {
    setSearchTerm(placeName);
    setSuggestions([]);
    console.log('Selected Coordinates:', coordinates);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const list = suggestionsRef.current ? suggestionsRef.current.children : [];
    if (e.key === 'ArrowDown') { // Down arrow
      setCurrentFocus(prevFocus => (prevFocus + 1) % list.length);
    } else if (e.key === 'ArrowUp') { // Up arrow
      setCurrentFocus(prevFocus => (prevFocus - 1 + list.length) % list.length);
    } else if (e.key === 'Enter') { // Enter key
      e.preventDefault();
      if (currentFocus > -1 && list.length > 0) {
        (list[currentFocus] as HTMLLIElement).click();
      }
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && suggestionsRef.current.children.length > 0) {
      (suggestionsRef.current.children[currentFocus] as HTMLLIElement)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentFocus]);

  return (
    <div className="autocomplete relative">
      <input
        type="text"
        placeholder="Search for a place..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="w-full lg:w-1/2 p-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul
          className="autocomplete-items absolute w-full lg:w-1/2 bg-white border rounded shadow-md mt-1 z-10"
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${currentFocus === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => handleSuggestionClick(suggestion.placeName, suggestion.coordinates)}
            >
              <strong>{suggestion.placeName.substr(0, searchTerm.length)}</strong>
              {suggestion.placeName.substr(searchTerm.length)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceSearch;