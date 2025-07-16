import React, { useState } from 'react';
import EditorPanel from './components/EditorPanel.jsx';
import LivePreview from './components/LivePreview.jsx';
import './App.css';

const App = () => {
const [profileData, setProfileData] = useState({
  name: '',
  description: '',
  avatar: '',
  background: '',
  socials: [],
  links: [],
  calendarEmbed: '',
  theme: 'light',
  customBackgroundColor: '#ffffff', // NEW: Default custom background color
  services: [],
});

  return (
    <div className="app-container">
      <div className="preview-panel">
        <LivePreview data={profileData} />
      </div>
      <div className="editor-panel">
        <EditorPanel data={profileData} onChange={setProfileData} />
      </div>
    </div>
  );
};

export default App;