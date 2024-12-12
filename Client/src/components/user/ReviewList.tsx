import  { useState } from "react";
import { List, Avatar, Rate, Pagination } from "antd";

const dummyReviews = [
  {
    id: 1,
    userName: "John Doe",
    userPhoto: "https://via.placeholder.com/40",
    time: "2024-12-11T08:00:00Z",
    rating: 4,
    content: "Great place to stay. The host was very welcoming and the property was clean and comfortable.",
  },
  {
    id: 2,
    userName: "Jane Smith",
    userPhoto: "https://via.placeholder.com/40",
    time: "2024-12-10T14:30:00Z",
    rating: 5,
    content: "Absolutely loved it! The location is perfect and the amenities exceeded expectations.",
  },
  {
    id: 3,
    userName: "Alex Johnson",
    userPhoto: "https://via.placeholder.com/40",
    time: "2024-12-09T18:45:00Z",
    rating: 3,
    content: "It was okay. The property could use some improvements, but the stay was decent overall.",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    userName: `User ${i + 4}`,
    userPhoto: "https://via.placeholder.com/40",
    time: `2024-12-${Math.max(1, i % 30)}T${8 + i % 12}:00:00Z`,
    rating: Math.floor(Math.random() * 5) + 1,
    content: "This is a sample review content for testing pagination and layout.",
  })),
];

const formatTime = (isoString: any) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReviewList = ({ setIsLocationModalOpen }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReviews = dummyReviews.slice(startIndex, endIndex);

  return (
    <div className="w-full mt-4 p-5 bg-gray-100 rounded-lg">
      <div className="border-b-2 flex justify-between border-gray-300 pb-3 mb-4">
        <h2 className="text-2xl font-bold text-black tracking-wide">User Reviews</h2>
        <button onClick={() => setIsLocationModalOpen(true)}
          className="rounded-full p-2 bg-BlueGray text-white font-semibold">
          + Add Review
        </button>
      </div>
      <List itemLayout="horizontal"
        dataSource={currentReviews}
        renderItem={(item) => (
          <List.Item className="border-gray-200 py-4">
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.userPhoto}
                  alt={item.userName}
                  size={50}
                  className="border border-gray-300 shadow-sm"
                />
              }
              title={
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{item.userName}</span>
                  <span className="text-sm text-gray-500 italic">{formatTime(item.time)}</span>
                </div>
              }
              description={
                <div className="mt-2">
                  <Rate value={item.rating} disabled className="text-yellow-500 text-sm" />
                  <p className="mt-2 text-gray-700">{item.content}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dummyReviews.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="ant-pagination-custom"
        />
      </div>
    </div>
  );
};

export default ReviewList;
