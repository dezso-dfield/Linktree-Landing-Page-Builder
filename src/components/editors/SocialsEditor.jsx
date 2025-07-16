// editors/SocialsEditor.jsx
import React from 'react';

const SocialsEditor = ({ socials, onChange }) => {
  const handleChange = (index, field, value) => {
    const updated = [...socials];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...socials, { name: '', url: '' }]);
  };

  const handleRemove = index => {
    const updated = socials.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="editor-section">
      <label>Social Links</label>
      {socials.map((s, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Platform (e.g. Twitter)"
            value={s.name}
            onChange={e => handleChange(i, 'name', e.target.value)}
            style={{ marginRight: '5px' }}
          />
          <input
            type="text"
            placeholder="https://..."
            value={s.url}
            onChange={e => handleChange(i, 'url', e.target.value)}
          />
          <button onClick={() => handleRemove(i)} style={{ marginLeft: '5px' }}>✖</button>
        </div>
      ))}
      <button onClick={handleAdd}>+ Add Social</button>
    </div>
  );
};

export default SocialsEditor;