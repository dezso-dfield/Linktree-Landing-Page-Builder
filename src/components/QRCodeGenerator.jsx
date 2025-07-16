import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ value }) => {
  return (
    <div className="editor-section">
      <label>QR Code</label>
      <div style={{ textAlign: 'center' }}>
        <QRCodeCanvas value={value} size={128} />
        <p style={{ fontSize: '0.8rem', color: '#555' }}>{value}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;