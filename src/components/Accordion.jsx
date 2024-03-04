import React, { useState } from 'react';
import '../styles/Accordion.css';

const Accordion = ({ items }) => {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const onTitleClick = (index) => {
    setActiveIndexes(activeIndexes.includes(index)
      ? activeIndexes.filter(i => i !== index)
      : [...activeIndexes, index]);
  };

  const isActive = index => activeIndexes.includes(index);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`accordion-item ${isActive(index) ? 'active' : ''}`}>
          <div className="title" onClick={() => onTitleClick(index)}>
            {item.title}
            <i className={`arrow ${isActive(index) ? 'up' : 'down'}`} />
          </div>
          <div className="content">{isActive(index) && item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
