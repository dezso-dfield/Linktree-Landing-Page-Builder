import React, { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaSnapchatGhost,
  FaUserSecret,
  FaPinterest,
  FaGlobe,
} from 'react-icons/fa';

// Helper function to calculate luminance of a hex color
const getLuminance = (hex) => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  // Apply Rec. 709 Luminance formula
  // For sRGB, values need to be linearized first.
  const srgbToLinear = (c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  r = srgbToLinear(r);
  g = srgbToLinear(g);
  b = srgbToLinear(b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const LivePreview = ({ data }) => {
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState('');
  const [fontColor, setFontColor] = useState('#333'); // Default for light

  // Determine font color based on background color luminance
  useEffect(() => {
    let backgroundColor = '';
    if (data.theme === 'custom' && data.customBackgroundColor) {
      backgroundColor = data.customBackgroundColor;
    } else if (data.theme === 'dark') {
      backgroundColor = '#333333';
    } else if (data.theme === 'light') {
      backgroundColor = '#ffffff';
    } else if (data.theme === 'gradient') {
      // For gradients, we can pick a representative color or just default.
      // For simplicity, let's assume a "light" tendency for the gradient preset.
      backgroundColor = '#f6d365'; // A color from your gradient
    }

    if (backgroundColor) {
      const luminance = getLuminance(backgroundColor);
      // A common threshold for light/dark is 0.179 or 0.5. 0.179 is good for WCAG.
      setFontColor(luminance > 0.179 ? '#333333' : '#ffffff');
    }
  }, [data.theme, data.customBackgroundColor]);


  const socialIconMap = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
    snapchat: FaSnapchatGhost,
    onlyfans: FaUserSecret,
    pinterest: FaPinterest,
    website: FaGlobe,
  };

  const handleReviewSubmit = () => {
    if (input.trim()) {
      setReviews([...reviews, input]);
      setInput('');
    }
  };

  // Determine background style based on theme
  const getBackgroundStyle = () => {
    if (data.theme === 'custom' && data.customBackgroundColor) {
      return { backgroundColor: data.customBackgroundColor };
    }
    // Existing theme backgrounds will be handled by CSS classes for simplicity,
    // or you can add specific inline styles here if you want.
    return {};
  };

  return (
    <div className={`preview-wrapper theme-${data.theme}`} style={getBackgroundStyle()}>
      <div className="preview-card" style={{ color: fontColor }}> {/* Apply dynamic font color */}
        {data.background && (
          <div
            className="header-background"
            style={{
              backgroundImage: `url(${data.background})`,
              height: '150px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px 12px 0 0',
              marginBottom: '10px',
            }}
          />
        )}

        {data.avatar && (
          <img
            src={data.avatar}
            alt="Avatar"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
          />
        )}

        <h2>{data.name || 'Your Name'}</h2>
        <p>{data.description || 'Your description goes here.'}</p>

        <div className="socials">
          {data.socials.map((s, i) => {
            const Icon = socialIconMap[s.name?.toLowerCase()];
            return (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                title={s.name}
                style={{ color: fontColor }} // Apply dynamic font color to icons
              >
                {Icon ? <Icon size={24} /> : s.name}
              </a>
            );
          })}
        </div>

        <div className="links">
          {data.links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="link-button"
              // You might want a consistent button color regardless of background for branding,
              // or calculate a contrasting button color too. For now, it stays fixed.
            >
              {l.title}
            </a>
          ))}
        </div>

        {data.calendarEmbed && (
          <iframe
            src={data.calendarEmbed}
            title="Calendar"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ marginTop: 20 }}
          ></iframe>
        )}

        {data.services.length > 0 && (
          <div className="services-section">
            <h3>Services</h3>
            <div className="services-list">
              {data.services.map((s, i) => (
                <div key={i} className="service-card" style={{ color: '#333' }}> {/* Service card text usually black or dark */}
                  {s.image && (
                    <img
                      src={s.image}
                      alt="service"
                      style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                    />
                  )}
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                  {s.price && <p><strong>{s.price}</strong></p>}
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="link-button"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="reviews" style={{ marginTop: '30px' }}>
          <h3>Reviews</h3>
          <input
            type="text"
            placeholder="Leave a review..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px',
                     backgroundColor: fontColor === '#ffffff' ? '#666' : '#fff', // Adjust input background
                     color: fontColor === '#ffffff' ? '#fff' : '#333', // Adjust input text color
                     border: `1px solid ${fontColor === '#ffffff' ? '#888' : '#ccc'}`
                   }}
          />
          <button onClick={handleReviewSubmit}>Submit</button>
          <ul style={{ paddingLeft: '1rem' }}>
            {reviews.map((r, i) => (
              <li key={i} style={{ backgroundColor: fontColor === '#ffffff' ? '#555' : '#f0f0f0', color: fontColor }}>
                &quot;{r}&quot;
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;