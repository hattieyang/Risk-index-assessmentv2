import React from 'react';
import '../styles/All.css';

function RightContentTop({ title, description }) {
  return (
    <div>
      <p className="title">{title}</p>
      <p className="description">{description}</p>
    </div>
  );
}

export default RightContentTop;
