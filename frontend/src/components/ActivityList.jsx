import React from 'react';

const ActivityList = ({ activities }) => {
  if (!activities.length) return <p>No activities found.</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity._id}>
          <h3>{activity.name}</h3>
          <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
          <p>Price: ${activity.price}</p>
          <p>Category: {activity.category}</p>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
