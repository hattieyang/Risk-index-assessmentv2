import React from 'react';

function SearchComponent({ inputValue, handleInputChange, handleSearch }) {
  return (
    <div className="d-lg-flex input-border-bottom p-2 pb-3" style={{ gap: '8px' }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="请输入危险化学品名称、别名、CAS号"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <button className="search-btn" onClick={handleSearch}>搜索</button>
    </div>
  );
}

export default SearchComponent;
