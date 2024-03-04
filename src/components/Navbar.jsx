import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="wrap-line">
        <div className="container">
            <nav>
                <ul className="nav-list d-flex">
                    <li>
                      <NavLink to="/" activeClassName="active-link">危险指数测算</NavLink>
                    </li>
                    <li>
                      <NavLink to="/FormulasandReferences" activeClassName="active-link">公式与参考资料</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Navbar;
