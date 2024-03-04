import React from 'react';
import logo from "../assets/logo.png"; 
import member from "../assets/member.svg"; 
import "../styles/Header.css";
import BubbleBox from "./BubbleBox";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="d-flex nav-left">
            <div className="col-lg-2">
              <img
                  src={logo}
                  className="d-inline-block align-top logo"
                  alt="J&K Scientific"
              />
            </div>
            <div className="d-flex col-lg-9 align-items-center">
              <h1 className="mt-2 mr-2"  style={{ marginLeft: '16px' }}>百灵威库存管理工具 - 危化品危险源分级与R值测算</h1>
              <BubbleBox
              title="国标GB18218-2018"
              bubbleContent="国标GB18218-2018"/>  
             
            </div>
          </div>
          <div className="d-flex nav-right justify-content-center align-items-center">
            <p className="mr-2">Username141...</p>
            <div className="col-lg-3">
              <img
                  src={member}
                  className="d-inline-block align-top"
                  alt="member"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
