// editors/CalendarEmbedEditor.jsx
import React from 'react';

const CalendarEmbedEditor = ({ calendarEmbed, onChange }) => {
  return (
    <div className="editor-section">
      <label>Calendar Embed URL (iframe src)</label>
      <input
        type="text"
        value={calendarEmbed}
        onChange={e => onChange(e.target.value)}
        placeholder="https://calendly.com/..."
      />
    </div>
  );
};

export default CalendarEmbedEditor;