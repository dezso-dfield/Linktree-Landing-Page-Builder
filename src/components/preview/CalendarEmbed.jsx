// preview/CalendarEmbed.jsx
import React from 'react';

const CalendarEmbed = ({ embed }) => {
  if (!embed) return null;

  return (
    <div className="calendar-embed">
      <iframe
        src={embed}
        title="Calendar"
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CalendarEmbed;