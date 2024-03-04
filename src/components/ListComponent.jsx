import React from 'react';

function ListComponent({ listItems, handleCheckboxChange, showAll, handleShowAllItems, selectedItems, hasSearched }) {
  return (
    <div className="checkbox-list">
      <ul className="list-item">
        {listItems.map(item => (
          <li key={item.id}>
            <span>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                value={item.value}
                checked={selectedItems[item.id]} 
                onChange={handleCheckboxChange}
                className="custom-checkbox-input"
              />
              <label htmlFor={item.id} className="custom-checkbox-label">
                {item.label} {/* 危险化学品名称 */}
              </label>
              <span className="nickname">{item.alias}</span> {/* 别名 */}
            </span>
            
            <span className="CAS">CAS <span style={{color: '#5EB1CC'}}>{item.value}</span></span>  {/* CAS号 */}
          </li>
        ))}
        {hasSearched && !showAll && (
          <li className="more">
            <a href="#" onClick={handleShowAllItems}>
              无匹配结果，显示所有选项
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ListComponent;
