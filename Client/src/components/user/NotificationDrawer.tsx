import React, { useEffect, useState } from 'react';
import { Drawer, Button, Empty, Tag } from 'antd';
import useSocket from '../../hooks/useSocket';
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';

interface Notification {
  id: number;
  type: 'verified' | 'rejected' | 'booked' | 'other';
  message: string;
  timestamp: number;
  propertyId?: string;
}

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  onNotificationsChange: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useSocket();

  useEffect(() => {
    loadNotificationsFromStorage();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('propertyNotification', handleNewNotification);

    return () => {
      socket.off('propertyNotification', handleNewNotification);
    };
  }, [socket]);

  const loadNotificationsFromStorage = () => {
    const storedNotifications = localStorage.getItem('propertyNotifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  const saveNotificationsToStorage = (updatedNotifications: Notification[]) => {
    localStorage.setItem('propertyNotifications', JSON.stringify(updatedNotifications));
  };

  const handleNewNotification = (notificationData: { type: Notification['type']; message: string; propertyId?: string }) => {
    const newNotification: Notification = {
      id: Date.now(),
      type: notificationData.type,
      message: notificationData.message,
      timestamp: Date.now(),
      propertyId: notificationData.propertyId,
    };

    setNotifications(prevNotifications => {
      const updatedNotifications = [newNotification, ...prevNotifications];
      saveNotificationsToStorage(updatedNotifications);
      return updatedNotifications;
    });
  };

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.filter(n => n.id !== id);
      saveNotificationsToStorage(updatedNotifications);
      return updatedNotifications;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('propertyNotifications');
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'verified':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'rejected':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      case 'booked':
        return <CalendarOutlined style={{ color: '#1890ff' }} />;
      default:
        return <HomeOutlined style={{ color: '#faad14' }} />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'verified':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      case 'booked':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Property Notifications</span>
          {notifications.length > 0 && (
            <Button onClick={clearAllNotifications} icon={<DeleteOutlined />} danger>
              Clear All
            </Button>
          )}
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      className="notifications-drawer"
    >
      {notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No new notifications"
        />
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className={`border rounded-lg shadow-sm p-4 ${getNotificationColor(notification.type)}`}>
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    {getNotificationIcon(notification.type)}
                    <span className="ml-2 font-semibold">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</span>
                  </div>
                  <p className="text-base text-gray-800 mb-2">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                    {notification.propertyId && (
                      <Tag color="blue">Property ID: {notification.propertyId}</Tag>
                    )}
                  </div>
                </div>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default NotificationDrawer;