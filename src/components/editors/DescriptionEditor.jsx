// editors/DescriptionEditor.jsx
import React from 'react';

const DescriptionEditor = ({ description, onChange }) => {
  return (
    <div className="editor-section">
      <label>Description</label>
      <textarea
        value={description}
        onChange={e => onChange(e.target.value)}
        placeholder="Tell people who you are..."
        rows={3}
      />
    </div>
  );
};

export default DescriptionEditor;