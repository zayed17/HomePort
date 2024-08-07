import { useState } from 'react';

const CreateAdPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [adDuration, setAdDuration] = useState<number>(7);
  const [budget, setBudget] = useState<number>(500);
  const [adDesign, setAdDesign] = useState<string>('Simple');
  const [targetAudience, setTargetAudience] = useState<string>('Local');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleCreateAd = () => {
    // Handle ad creation logic here
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">Create Your Property Ad</h1>

      <section className="bg-white p-8 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Create an Ad?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Boost your property's visibility in search results.</li>
          <li>Reach a targeted audience based on location and preferences.</li>
          <li>Enhance your chances of selling or renting faster.</li>
        </ul>
      </section>

      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Select Property</label>
        <select
          value={selectedProperty || ''}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>Select a property...</option>
          <option value="property1">Property 1</option>
          <option value="property2">Property 2</option>
          {/* Map through user's properties here */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Ad Duration (Days)</label>
          <input
            type="number"
            value={adDuration}
            onChange={(e) => setAdDuration(Number(e.target.value))}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Budget (₹)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Ad Design</label>
        <select
          value={adDesign}
          onChange={(e) => setAdDesign(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Simple">Simple</option>
          <option value="Modern">Modern</option>
          <option value="Elegant">Elegant</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Target Audience</label>
        <select
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Local">Local</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={handlePreview}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          Preview
        </button>

        <button
          onClick={handleCreateAd}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-transform transform hover:scale-105"
        >
          Create Ad
        </button>
      </div>

      {showPreview && (
        <div className="mt-10 p-6 bg-gray-100 border rounded-lg shadow-inner">
          <h2 className="text-xl font-bold mb-4">Ad Preview</h2>
          <p><strong>Property:</strong> {selectedProperty}</p>
          <p><strong>Duration:</strong> {adDuration} days</p>
          <p><strong>Budget:</strong> ₹{budget}</p>
          <p><strong>Design:</strong> {adDesign}</p>
          <p><strong>Target Audience:</strong> {targetAudience}</p>
          {/* You can add a more visual preview here */}
        </div>
      )}
    </div>
  );
};

export default CreateAdPage;