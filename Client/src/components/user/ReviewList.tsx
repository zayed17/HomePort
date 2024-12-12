import { useState } from "react";
import { List, Avatar, Rate, Pagination, Dropdown, Menu, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const formatTime = (isoString: string) => {
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

const ReviewList = ({ setIsLocationModalOpen, reviews, handleEdit, handleDelete }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddReview = () => {
    if (!isAuthenticated) {
      message.warning("Please log in to add a review.");
      return;
    }
    setIsLocationModalOpen(true);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReviews = reviews?.slice(startIndex, endIndex) || [];


  const menu = (reviewId: string) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEdit(reviewId)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(reviewId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full mt-4 p-5 bg-gray-100 rounded-lg">
      <div className="border-b-2 flex justify-between border-gray-300 pb-3 mb-4">
        <h2 className="text-2xl font-bold text-black tracking-wide">User Reviews</h2>
        <button
          onClick={handleAddReview}
          className="rounded-full p-2 bg-BlueGray text-white font-semibold"
        >
          + Add Review
        </button>
      </div>

      {reviews && reviews.length > 0 ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={currentReviews}
            renderItem={(item: any) => (
              <List.Item className="border-gray-200 py-4">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.userId.imageUrl || "https://via.placeholder.com/40"}
                      alt={item.name}
                      size={50}
                      className="border border-gray-300 shadow-sm"
                    />
                  }
                  title={
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{item.userId.name}</span>
                        <span className="text-sm text-gray-500 italic">{formatTime(item.createdAt)}</span>
                      </div>
                      <Dropdown overlay={menu(item._id)} trigger={['click']}>
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          className="ml-2"
                        />
                      </Dropdown>
                    </div>
                  }
                  description={
                    <div>
                      <Rate
                        value={item.rating || 0}
                        disabled
                        className="text-yellow-500 text-sm"
                      />
                      <p className="mt-2 text-gray-700">{item.description || "No content provided"}</p>
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
              total={reviews.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="ant-pagination-custom"
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 italic">No reviews available.</div>
      )}
    </div>
  );
};

export default ReviewList;
