// components/user/VideosPhotosForm.js
import React from 'react';

const VideosPhotosForm = ({ formData, setFormData }) => {
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      mediaFiles: [...formData.mediaFiles, ...e.target.files],
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Videos & Photos</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Media Files</label>
          <input
            type="file"
            name="mediaFiles"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border"
          />
        </div>
      </form>
    </div>
  );
};

export default VideosPhotosForm;