// preview/SocialIcons.jsx
import React from 'react';

const SocialIcons = ({ socials }) => {
  if (!socials || socials.length === 0) return null;

  return (
    <div className="social-icons">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          {social.name}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;