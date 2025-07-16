import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator.jsx';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage';

const EditorPanel = ({ data, onChange }) => {
  const [croppingType, setCroppingType] = useState(null);
  const [imageToCrop, setImageToCrop] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const updateArray = (field, index, key, value) => {
    const updated = [...data[field]];
    updated[index][key] = value;
    onChange({ ...data, [field]: updated });
  };

  const addItem = (field, item) => {
    onChange({ ...data, [field]: [...data[field], item] });
  };

  const removeItem = (field, index) => {
    const updated = data[field].filter((_, i) => i !== index);
    onChange({ ...data, [field]: updated });
  };

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
    updateField(croppingType, croppedImage);
    setCroppingType(null);
    setImageToCrop('');
  };

  return (
    <div className="editor-panel">
      <h2>Edit Your Link Page</h2>

      <label>Page Title</label>
      <input type="text" value={data.name} onChange={e => updateField('name', e.target.value)} />

      <label>Description</label>
      <textarea value={data.description} onChange={e => updateField('description', e.target.value)} />

      {/* Avatar Section */}
      <label>Avatar (Upload & Crop)</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files[0];
          if (file) {
            setCroppingType('avatar');
            setImageToCrop(URL.createObjectURL(file));
          }
        }}
      />
      {data.avatar && (
        <div style={{ marginTop: '10px' }}>
          <img src={data.avatar} alt="Avatar Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Background Section */}
      <label>Background (Upload & Crop)</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files[0];
          if (file) {
            setCroppingType('background');
            setImageToCrop(URL.createObjectURL(file));
          }
        }}
      />
      {data.background && (
        <div style={{ marginTop: '10px' }}>
          <img src={data.background} alt="Background Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
      )}

      {croppingType && (
        <div className="cropper-modal-overlay"> {/* New class for overlay */}
          <div className="cropper-container"> {/* New class for cropper container */}
            <div className="cropper-area"> {/* New class for cropper area */}
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={croppingType === 'avatar' ? 1 : 16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
              />
            </div>
            <button
              onClick={handleCropSave}
              className="save-crop-button" // New class for button
            >
              Save Cropped {croppingType === 'avatar' ? 'Avatar' : 'Background'}
            </button>
          </div>
        </div>
      )}

      {/* Social Links Section */}
      <label>Social Links</label>
      {data.socials.map((s, i) => (
        <div key={i} className="social-item"> {/* Added class */}
          <select value={s.name} onChange={e => updateArray('socials', i, 'name', e.target.value)}>
            <option value="">Select Platform</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="snapchat">Snapchat</option>
            <option value="onlyfans">OnlyFans</option>
            <option value="pinterest">Pinterest</option>
            <option value="website">Website</option>
          </select>
          <input
            type="text"
            placeholder="https://..."
            value={s.url}
            onChange={e => updateArray('socials', i, 'url', e.target.value)}
          />
          <button onClick={() => removeItem('socials', i)}>✖</button>
        </div>
      ))}
      <button onClick={() => addItem('socials', { name: '', url: '' })} className="add-button">+ Add Social</button> {/* Added class */}

      {/* Links Section */}
      <label>Links</label>
      {data.links.map((l, i) => (
        <div key={i} className="link-item"> {/* Added class */}
          <input type="text" value={l.title} placeholder="Title" onChange={e => updateArray('links', i, 'title', e.target.value)} />
          <input type="text" value={l.url} placeholder="URL" onChange={e => updateArray('links', i, 'url', e.target.value)} />
          <button onClick={() => removeItem('links', i)}>✖</button>
        </div>
      ))}
      <button onClick={() => addItem('links', { title: '', url: '' })} className="add-button">+ Add Link</button> {/* Added class */}

      {/* Services Section */}
      <label>Services</label>
      {data.services.map((s, i) => (
        <div key={i} className="service-editor-card"> {/* Added class */}
          <input type="text" placeholder="Title" value={s.title} onChange={e => updateArray('services', i, 'title', e.target.value)} />
          <textarea placeholder="Description" value={s.description} onChange={e => updateArray('services', i, 'description', e.target.value)} />
          <input type="text" placeholder="Price" value={s.price} onChange={e => updateArray('services', i, 'price', e.target.value)} />
          <input type="text" placeholder="Image URL (optional)" value={s.image} onChange={e => updateArray('services', i, 'image', e.target.value)} />
          <input type="text" placeholder="Link (optional)" value={s.link} onChange={e => updateArray('services', i, 'link', e.target.value)} />
          <button onClick={() => removeItem('services', i)} className="remove-button">Remove Service</button> {/* Added class */}
        </div>
      ))}
      <button onClick={() => addItem('services', { title: '', description: '', price: '', image: '', link: '' })} className="add-button">+ Add Service</button> {/* Added class */}

      <label>Calendar Embed (iframe src)</label>
      <input type="text" value={data.calendarEmbed} onChange={e => updateField('calendarEmbed', e.target.value)} />

      <label>Theme Preset</label>
      <select value={data.theme} onChange={e => updateField('theme', e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="gradient">Gradient</option>
        <option value="custom">Custom Color</option> {/* New option */}
      </select>

      {data.theme === 'custom' && (
        <>
          <label>Custom Background Color</label>
          <input
            type="color"
            value={data.customBackgroundColor || '#ffffff'} // Default to white
            onChange={e => updateField('customBackgroundColor', e.target.value)}
          />
        </>
      )}

      <QRCodeGenerator value={`https://yourdomain.com/${data.name.replace(/\s+/g, '-').toLowerCase()}`} />
    </div>
  );
};

export default EditorPanel;