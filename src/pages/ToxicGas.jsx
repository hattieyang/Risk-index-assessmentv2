import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import RightContentTop from '../components/RightContentTop';
import '../styles/All.css';
import '../styles/Table.css';
import { toxicgas_t3 } from '../Content/toxicgas_t3';
import { toxicgas_t4 } from '../Content/toxicgas_t4';

function ToxicGas() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const terms = searchInput.split(',').map(term => term.trim().toLowerCase()).filter(term => term.length > 0);
    const results = toxicgas_t4.filter(item =>
      terms.some(term =>
        item.类别.toLowerCase().includes(term) ||
        item.符号.toLowerCase().includes(term) ||
        String(item["β校正系数"]).includes(term)
      )
    );
    setSearchResults(results);
  };


  return (
    <div>
      <Navbar />
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
          <SideNavbar />
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
          <RightContentTop title="有毒气体校正指数（β）" description="据化学品信息进行搜索计算，非气体产品结果固定为1" />
          <div className="d-lg-flex input-border-bottom p-2 pb-3" style={{ gap: '8px' }}>
            <div className="search-container">
              <input
                type="text"
                placeholder="请输入类别或符号搜索"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
                搜索
              </button>
          </div>
          {searchResults.length > 0 ? (
            <ul className="list-item">
              {searchResults.map((item, index) => (
                <li key={index}>
                  <span>
                    <span className="toxic-category">{item.类别}</span>
                    <span className="toxic-symbol nickname">{item.符号}</span>
                  </span>
                  <span className="correction-number">β校正系数：<span className="red">{item["β校正系数"]}</span></span>
                </li>
              ))}
            </ul>
          ) : null}
          <h3 className="mt-3" style={{ fontSize: '18px', textAlign: 'center' }}>
            毒性气体校正系数β取值表
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>毒性气体名称</th>
                  <th>β校正系数</th>
                </tr>
              </thead>
              <tbody>
                {toxicgas_t3.map((row, index) => (
                  <tr key={index}>
                    <td>{row["毒性气体名称"]}</td>
                    <td>{row["β校正系数"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 blue" style={{ fontSize: '12px' }}>
            · 未在毒性气体校正系数β取值表3中列举的危险化学品，请根据类别或符号进行搜索
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToxicGas;
