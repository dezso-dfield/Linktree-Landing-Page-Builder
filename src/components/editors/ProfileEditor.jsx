// editors/ProfileEditor.jsx
import React from 'react';

const ProfileEditor = ({ name, onChange }) => {
  return (
    <div className="editor-section">
      <label>Page Title / Name</label>
      <input
        type="text"
        value={name}
        onChange={e => onChange(e.target.value)}
        placeholder="John Doe"
      />
    </div>
  );
};

export default ProfileEditor;