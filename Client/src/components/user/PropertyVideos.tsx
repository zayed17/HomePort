import React, { useState } from 'react';

interface FormData {
  mediaFiles: File[];
}

interface VideosPhotosFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const VideosPhotosForm: React.FC<VideosPhotosFormProps> = ({ formData, setFormData }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    
    if (formData.mediaFiles.length + files.length < 4) {
      setError('You must upload at least 4 images.');
      return;
    } else {
      setError(null);
    }

    setFormData({
      ...formData,
      mediaFiles: [...formData.mediaFiles, ...files],
    });

    setPreviewImages(prev => [...prev, ...newPreviewImages]);
  };

  const handleRemoveImage = (index: number) => {
    const newMediaFiles = [...formData.mediaFiles];
    const newPreviewImages = [...previewImages];
    
    newMediaFiles.splice(index, 1);
    newPreviewImages.splice(index, 1);

    setFormData({
      ...formData,
      mediaFiles: newMediaFiles,
    });

    setPreviewImages(newPreviewImages);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8">
      <h2 className="text-xl font-semibold mb-4">Videos & Photos</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Media Files</label>
          <input
            type="file"
            name="mediaFiles"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {previewImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-full rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
            {previewImages.length > 4 && (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg border border-dashed text-gray-600">
                +{previewImages.length - 4}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default VideosPhotosForm;