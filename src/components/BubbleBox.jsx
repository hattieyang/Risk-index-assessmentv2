// BubbleBox component
import React from 'react';
import "../styles/BubbleBox.css";
import bubble from "../assets/bubble.svg"; 

const BubbleBox = ({ bubbleContent }) => {
  return (
      <div className="bubble-box">
        <img src={bubble} alt="bubble" />
        <div className="bubble-content">{bubbleContent}</div>
      </div>
  );
};

export default BubbleBox;

