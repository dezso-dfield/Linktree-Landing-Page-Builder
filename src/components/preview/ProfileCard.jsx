// preview/ProfileCard.jsx
import React from 'react';

const ProfileCard = ({ avatar, name, description }) => {
  return (
    <div className="profile-card">
      {avatar && (
        <img src={avatar} alt="Avatar" className="profile-avatar" />
      )}
      <h2 className="profile-name">{name || 'Your Name'}</h2>
      <p className="profile-description">{description || 'Your bio here...'}</p>
    </div>
  );
};

export default ProfileCard;