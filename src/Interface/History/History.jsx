import React from 'react';
import './History.css';

const History = () => {
  const historyData = [
    { date: '2024-09-01', description: 'Started a new project on React.' },
    { date: '2024-08-15', description: 'Completed a styled-components course.' },
    { date: '2024-08-01', description: 'Released the latest version of the app.' },
  ];

  return (
    <div className="container">
      <h1 className="title">History</h1>
      <div className="history-list">
        {historyData.map((item, index) => (
          <div key={index} className="history-item">
            <p className="date">{item.date}</p>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
