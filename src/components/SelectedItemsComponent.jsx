function SelectedItemsComponent({ selectedListItems, totalCount, handleDeleteItem, handleClear }) {
  return (
    <div className="selected-list mt-3">
      <ul className="list-item">
        {selectedListItems.map(item => (
          <li key={item.id}>
            <span>{item.label}</span>
            <button className="delete" onClick={() => handleDeleteItem(item.id)}>删除</button>
          </li>
        ))}
      </ul>
      <div className="count-wrap">
        <p>库存临界值结果（Q）：<span className="count">{totalCount}</span>（吨）</p>
        <button className="clear" onClick={handleClear}>清空</button>
      </div>
    </div>
  );
}

export default SelectedItemsComponent;
