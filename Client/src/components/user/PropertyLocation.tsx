// import  { useEffect, useRef, useState } from 'react';
// import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import { TextInput } from '../admin/ReuseableForm';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoiemF5ZWQxNyIsImEiOiJjbHl6Zm05a3EyNjdhMmlyNHRmNDN0dnY0In0.FZ9b6XoiUkxTkscj0mClcA';

// const LocationDetailsForm = ({ formData, setFormData }) => {
//   const mapRef = useRef(null);
//   const [lng, setLng] = useState<number | undefined>(undefined);
//   const [lat, setLat] = useState<number | undefined>(undefined);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { longitude, latitude } = position.coords;
//           setLng(longitude);
//           setLat(latitude);
//           setFormData({
//             ...formData,
//             longitude,
//             latitude,
//           });
//           reverseGeocode(longitude, latitude);
//         },
//         (error) => {
//           console.error("Error getting location", error);
//           setLng(76.2673); 
//           setLat(10.0165);
//         }
//       );
//     } else {
//       setLng(76.2673); 
//       setLat(10.0165);
//     }
//   }, [formData, setFormData]);

//   const reverseGeocode = async (longitude, latitude) => {
//     const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`);
//     const data = await response.json();
//     if (data.features && data.features.length > 0) {
//       const place = data.features[0];
//       const [lng, lat] = place.center;
//       const address = place.place_name;
//       const city = place.context.find(c => c.id.includes('place'))?.text || '';
//       const state = place.context.find(c => c.id.includes('region'))?.text || '';
//       const postalCode = place.context.find(c => c.id.includes('postcode'))?.text || '';
//       const district = place.context.find(c => c.id.includes('district'))?.text || '';

//       setFormData({
//         ...formData,
//         longitude: lng,
//         latitude: lat,
//         address,
//         city,
//         state,
//         postalCode,
//         district,
//       });
//     }
//   };

//   const handleMapClick = (e) => {
//     const { lngLat } = e;
//     setLng(lngLat.lng);
//     setLat(lngLat.lat);
//     reverseGeocode(lngLat.lng, lngLat.lat);
//   };

//   const GeocoderControl = () => {
//     useEffect(() => {
//       const geocoder = new MapboxGeocoder({
//         accessToken: MAPBOX_TOKEN,
//         marker: false,
//         collapsed: true,
//       });

//       geocoder.on('result', (e) => {
//         const coords = e.result.geometry.coordinates;
//         setLng(coords[0]);
//         setLat(coords[1]);
//         reverseGeocode(coords[0], coords[1]);
//       });

//       if (mapRef.current) {
//         mapRef.current.getMap().addControl(geocoder);
//       }

//       return () => {
//         if (mapRef.current) {
//           mapRef.current.getMap().removeControl(geocoder);
//         }
//       };
//     }, []);

//     return null;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg max-w-6xl mx-auto p-6 lg:p-8">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Location Details</h2>
//       <div className="flex flex-col lg:flex-row">
//         <form className="w-full lg:w-1/2 space-y-4 lg:space-y-2 p-4 lg:p-6">
//           <TextInput
//             label="Address"
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter address"
//           />
//           <TextInput
//             label="State"
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="Enter state"
//           />
//            <TextInput
//             label="District"
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//             placeholder="Enter district"
//           />
//           <TextInput
//             label="City"
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="Enter city"
//           />
//           <TextInput
//             label="Postal Code"
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             placeholder="Enter postal code"
//           />
//         </form>
//         <div className="w-full lg:w-1/2 h-96 lg:h-[500px]">
//           <ReactMapGL
//             ref={mapRef}
//             mapboxAccessToken={MAPBOX_TOKEN}
//             initialViewState={{
//               longitude: lng || 76.2673, 
//               latitude: lat || 10.0165,  
//               zoom: 14,
//             }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             onClick={handleMapClick}
//           >
//             {lng !== undefined && lat !== undefined && (
//               <Marker
//                 latitude={lat}
//                 longitude={lng}
//                 draggable
//                 onDragEnd={(e) => {
//                   const { lngLat } = e;
//                   setLng(lngLat.lng);
//                   setLat(lngLat.lat);
//                   reverseGeocode(lngLat.lng, lngLat.lat);
//                 }}
//               />
//             )}
//             <NavigationControl position="bottom-right" />
//             <GeolocateControl
//               position="top-left"
//               trackUserLocation
//               onGeolocate={(e) => {
//                 const { longitude, latitude } = e.coords;
//                 setLng(longitude);
//                 setLat(latitude);
//                 reverseGeocode(longitude, latitude);
//                 mapRef.current?.flyTo({
//                   center: [longitude, latitude],
//                   zoom: 14,
//                 });
//               }}
//             />
//             <GeocoderControl />
//           </ReactMapGL>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationDetailsForm;


import { useEffect, useRef, useState } from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, MapRef } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { TextInput } from '../admin/ReuseableForm';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiemF5ZWQxNyIsImEiOiJjbHpqbnl5d3YwdHJsMmpzaXRkcHc1NW55In0.C91Rt8F6i6zkC2mHGqubcg';

interface FormData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  district: string;
  longitude?: number;
  latitude?: number;
}

interface LocationDetailsFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const LocationDetailsForm: React.FC<LocationDetailsFormProps> = ({ formData, setFormData }) => {
  const mapRef = useRef<MapRef | null>(null);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [lat, setLat] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLng(longitude);
          setLat(latitude);
          setFormData({
            ...formData,
            longitude,
            latitude,
          });
          reverseGeocode(longitude, latitude);
        },
        (error) => {
          console.error("Error getting location", error);
          setLng(76.2673); 
          setLat(10.0165);
        }
      );
    } else {
      setLng(76.2673); 
      setLat(10.0165);
    }
  }, [formData, setFormData]);

  const reverseGeocode = async (longitude: number, latitude: number) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const place = data.features[0];
      const address = place.place_name;
      const city = place.context.find((c: any) => c.id.includes('place'))?.text || '';
      const state = place.context.find((c: any) => c.id.includes('region'))?.text || '';
      const postalCode = place.context.find((c: any) => c.id.includes('postcode'))?.text || '';
      const district = place.context.find((c: any) => c.id.includes('district'))?.text || '';

      setFormData({
        ...formData,
        longitude,
        latitude,
        address,
        city,
        state,
        postalCode,
        district,
      });
    }
  };

  const handleMapClick = (e: any) => {
    const { lngLat } = e;
    setLng(lngLat.lng);
    setLat(lngLat.lat);
    reverseGeocode(lngLat.lng, lngLat.lat);
  };

  const GeocoderControl = () => {
    useEffect(() => {
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        marker: false,
        collapsed: true,
      });

      geocoder.on('result', (e: any) => {
        const coords = e.result.geometry.coordinates;
        setLng(coords[0]);
        setLat(coords[1]);
        reverseGeocode(coords[0], coords[1]);
      });

      if (mapRef.current) {
        mapRef.current.getMap().addControl(geocoder);
      }

      return () => {
        if (mapRef.current) {
          mapRef.current.getMap().removeControl(geocoder);
        }
      };
    }, []);

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-6xl mx-auto p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Location Details</h2>
      <div className="flex flex-col lg:flex-row">
        <form className="w-full lg:w-1/2 space-y-4 lg:space-y-2 p-4 lg:p-6">
          <TextInput
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <TextInput
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
          <TextInput
            label="District"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter district"
          />
          <TextInput
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
          <TextInput
            label="Postal Code"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter postal code"
          />
        </form>
        <div className="w-full lg:w-1/2 h-96 lg:h-[500px]">
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: lng || 76.2673, 
              latitude: lat || 10.0165,  
              zoom: 14,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={handleMapClick}
          >
            {lng !== undefined && lat !== undefined && (
              <Marker
                latitude={lat}
                longitude={lng}
                draggable
                onDragEnd={(e) => {
                  const { lngLat } = e;
                  setLng(lngLat.lng);
                  setLat(lngLat.lat);
                  reverseGeocode(lngLat.lng, lngLat.lat);
                }}
              />
            )}
            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
              onGeolocate={(e) => {
                const { longitude, latitude } = e.coords;
                setLng(longitude);
                setLat(latitude);
                reverseGeocode(longitude, latitude);
                mapRef.current?.flyTo({
                  center: [longitude, latitude],
                  zoom: 14,
                });
              }}
            />
            <GeocoderControl />
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsForm;