import React, { useState } from 'react';

const footerStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '40px',
  background: '#ffffff',
  borderTop: '1px solid #ddd',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 1000,
};

const buttonStyles = (active) => ({
  border: 'none',
  background: 'transparent',
  color: active ? '#0078d4' : '#555',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '12px',
  cursor: 'pointer',
  gap: '4px',
  padding: '8px 12px',
});

const iconStyles = {
  fontSize: '24px',
  lineHeight: 1,
};

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'routes', label: 'Routes', icon: '🗺️' },
  { id: 'updates', label: 'Updates', icon: '🔔' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

function Footer({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
  };

  return (
    <footer style={footerStyles}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabClick(tab.id)}
          style={buttonStyles(tab.id === activeTab)}
          aria-label={tab.label}
        >
          <span style={iconStyles}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </footer>
  );
}

export default Footer;
