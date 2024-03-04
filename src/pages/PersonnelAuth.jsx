import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import RightContentTop from '../components/RightContentTop';
import '../styles/All.css';
import '../styles/Table.css';

function PersonnelAuth() {
  const [inputValue, setInputValue] = useState('');
  const [correctionCoefficient, setCorrectionCoefficient] = useState(0); // Default value set to 0

  const calculateCoefficient = () => {
    const number = parseInt(inputValue, 10);
    let coefficient = 0.5; // Updated to handle the case when number is 0 directly

    if (isNaN(number) || number < 0) { // Check if the input is not a number or negative
      coefficient = 0; // Keep default or set to any specific value for invalid input
    } else if (number >= 1 && number <= 29) {
      coefficient = 1.0;
    } else if (number >= 30 && number <= 49) {
      coefficient = 1.2;
    } else if (number >= 50 && number <= 99) {
      coefficient = 1.5;
    } else if (number >= 100) {
      coefficient = 2.0;
    }

    setCorrectionCoefficient(coefficient);
  };

  return (
    <div>
      <Navbar />
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
          <SideNavbar />
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
          <RightContentTop title="人员校正系数（α）" description="输入人数以得到人员校正系数计算结果" />
          <div className="d-lg-flex p-2" style={{ gap: '8px' }}>
            <div className="search-container">
              <input
                type="text"
                placeholder="请输入危险化学品重大危险源的厂区边界向外扩展500米范围内常住人口数量"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={calculateCoefficient}>
              计算
            </button>
          </div>
          <div className="selected-list mt-3">
            <div className="count-wrap">
              <p>人数指数correction coefficient（α）：<span className="count">{correctionCoefficient}</span></p>
              <button className="clear" onClick={() => { setInputValue(''); setCorrectionCoefficient(0); }}>
                清空
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonnelAuth;
