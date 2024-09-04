import React from 'react';

interface MediaPreviewModalProps {
  mediaUrl: string | null;
  onClose: () => void;
  onSend: () => void;
}

const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({ mediaUrl, onClose, onSend }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg relative max-w-md w-full">
          <button onClick={onClose} className="absolute top-2 right-2 text-black text-xl">X</button>
          <img src={mediaUrl!} alt="Media Preview" className="max-w-full h-auto rounded-lg" />
          <div className="mt-4 flex justify-end">
            <button onClick={onSend} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Send</button>
          </div>
        </div>
      </div>
    );
  };

export default MediaPreviewModal;