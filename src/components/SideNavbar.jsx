import React, { useState, useEffect } from 'react';
import "../styles/Navbar.css";
import { Link, useLocation } from 'react-router-dom';

function SideNavbar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const navItems = [
    { path: "/", label: "库存临界值（Q）" },
    { path: "/toxic-gas", label: "有毒气体校正指数（β）" },
    { path: "/personnel-auth", label: "人员校正系数（α）" },
    { path: "/major-hazard", label: "重大危险源辨识指标（S）" },
    { path: "/major-hazard-ranking", label: "重大危险源分级指标（R）" }
  ];
  
  // ...
  
  return (
    <div className="nav-container">
      {navItems.map(item => (
        <a key={item.path} href={item.path} className={`${activeItem === item.path ? 'active' : ''}`}>
        <div className="nav-item mt-3">
          {item.label}
        </div>
        </a>
      ))}
    </div>

  );
}

export default SideNavbar;
