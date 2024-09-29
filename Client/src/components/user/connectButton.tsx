import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';

interface ConnectWithOwnerButtonProps {
  ownerId: string;
  ownerName: string;
  ownerPhoto: string;
  onChatStart: (chatId: string) => void;
}

const ConnectWithOwnerButton: React.FC<ConnectWithOwnerButtonProps> = ({
  ownerId,
  ownerName,
  ownerPhoto,
  onChatStart,
}) => {
  const navigate = useNavigate();
  const { userDetails, isLoading, isError } = useUserDetails();

  const handleConnect = async () => {
    if (isLoading) {
      console.log('User details are still loading...');
      return;
    }

    if (userDetails) {
      try {
        // const response = await fetch('http://localhost/api/chat/chats', {
        const response = await fetch('https://homeport.online/api/chat/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            participants: [
              { userId: ownerId, name: ownerName, photo: ownerPhoto },
              { userId: userDetails._id, name: userDetails.firstName, photo: userDetails.image },
            ],
          }),
        });

        const chat = await response.json();
        if (chat._id) {
          onChatStart(chat._id);
          navigate(`/chat/${chat._id}`);
        }
      } catch (error) {
        console.error('Error connecting to chat:', error);
      }
    } else {
      console.error('User details are not available');
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading || isError}
      className="border-BlueGray border text-BlueGray font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2"
    >
      <span>Connect With Owner</span>
    </button>
  );
};

export default ConnectWithOwnerButton;