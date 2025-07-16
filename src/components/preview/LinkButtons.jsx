// preview/LinkButtons.jsx
import React from 'react';

const LinkButtons = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="link-buttons">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-button"
        >
          {link.title || 'Link'}
        </a>
      ))}
    </div>
  );
};

export default LinkButtons;