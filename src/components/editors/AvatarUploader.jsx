// editors/AvatarUploader.jsx
import React from 'react';

const AvatarUploader = ({ avatar, onChange }) => {
  return (
    <div className="editor-section">
      <label>Profile Picture URL</label>
      <input
        type="text"
        value={avatar}
        onChange={e => onChange(e.target.value)}
        placeholder="https://example.com/avatar.jpg"
      />
      {avatar && (
        <div style={{ marginTop: '10px' }}>
          <img src={avatar} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;