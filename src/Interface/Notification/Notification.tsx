import React from 'react';
import './Notification.css';

const notifications = [
  { id: 1, message: 'You have a new message from John Doe.', time: '2 minutes ago' },
  { id: 2, message: 'Your order has been shipped.', time: '1 hour ago' },
  { id: 3, message: 'New comment on your post.', time: '3 hours ago' },
];

const Notification = () => {
  return (
    <div className="notification-container">
      <h1 className="notification-title">Notifications</h1>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <p className="notification-message">{notification.message}</p>
            <span className="notification-time">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
