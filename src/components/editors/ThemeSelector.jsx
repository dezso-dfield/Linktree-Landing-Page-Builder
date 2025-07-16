// editors/ThemeSelector.jsx
import React from 'react';

const themes = [
  { id: 'light', label: 'Light', color: '#ffffff' },
  { id: 'dark', label: 'Dark', color: '#1e1e1e' },
  { id: 'gradient', label: 'Gradient', color: 'linear-gradient(to right, #f2709c, #ff9472)' },
];

const ThemeSelector = ({ theme, onChange }) => {
  return (
    <div className="editor-section">
      <label>Theme</label>
      <div className="theme-options">
        {themes.map(t => (
          <div
            key={t.id}
            className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
            style={{ background: t.color }}
          >
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;