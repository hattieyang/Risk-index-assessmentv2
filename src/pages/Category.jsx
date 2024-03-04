import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import PaginationComponent from '../components/PaginationComponent';
import RightContentTop from '../components/RightContentTop';
import { CategoryData } from "../Content/CategoryData";
import CategoryBtn from "../assets/category-btn-icon.svg";
import '../styles/All.css';
import { Link } from 'react-router-dom';

function Category() {
  const [inputValue, setInputValue] = useState('');
  const [categoryList, setCategoryList] = useState(CategoryData);
  const [showCheckboxList, setShowCheckboxList] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [pageCount, setPageCount] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [transformedData, setTransformedData] = useState([]);


  useEffect(() => {
    const transformedCategoryData = CategoryData.map((item, index) => ({
      label: item["危险性分类及说明"],
      alias: item["符号"],
      value: item["类别"],
      number: isNaN(item["临界量（t）"]) || item["临界量（t）"] === "/" ? 0 : Number(item["临界量（t）"])
    }));

    setTransformedData(transformedCategoryData);
    setPageCount(Math.ceil(transformedCategoryData.length / itemsPerPage));
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(Object.keys(categoryList).length / itemsPerPage));
  }, [categoryList, itemsPerPage]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      const searchTerms = inputValue.split(/[，,]+/).map(term => term.trim());
      const filteredData = CategoryData.filter(category =>
        searchTerms.some(term => category["类别"].includes(term))
      );

      setCategoryList(processCategoryData(filteredData));
      setCurrentPage(1);
      setPageCount(Math.ceil(Object.keys(filteredData).length / itemsPerPage));
      setShowCheckboxList(true);
      setHasSearched(true);
      setShowAll(Object.keys(filteredData).length > itemsPerPage);
    } else {
      resetSearch();
    }
  };

  const resetSearch = () => {
    setCategoryList(CategoryData);
    setShowCheckboxList(false);
    setCurrentPage(1);
    setPageCount(Math.ceil(CategoryData.length / itemsPerPage));
    setShowAll(false);
    setHasSearched(false);
  };

  const currentItems = Object.entries(categoryList).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, pageCount));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (category, symbol, description) => {
    const foundItem = transformedData.find(item =>
      item.label === description && item.alias === symbol && item.value === category
    );
    const criticalAmount = foundItem ? foundItem.number : 0;
    const newItem = { category, symbol, description, number: criticalAmount };
  
    setSelectedItems(prevItems => {
      const itemIndex = prevItems.findIndex(item =>
        item.category === category && item.symbol === symbol && item.description === description
      );
      return itemIndex > -1 ? 
        [...prevItems.slice(0, itemIndex), ...prevItems.slice(itemIndex + 1)] : 
        [...prevItems, newItem];
    });
  };

  const handleDeleteItem = (itemToDelete) => {
    setSelectedItems(prevItems =>
      prevItems.filter(item =>
        item.category !== itemToDelete.category || item.symbol !== itemToDelete.symbol || item.description !== itemToDelete.description
      )
    );
  };

  const totalCount = selectedItems.reduce((sum, item) => sum + item.number, 0);

  const processCategoryData = (data) => {
    return data.reduce((acc, curr) => {
      const categoryKey = curr["类别"];
      const symbolKey = curr["符号"];
      acc[categoryKey] = acc[categoryKey] || {};
      acc[categoryKey][symbolKey] = acc[categoryKey][symbolKey] || [];
      acc[categoryKey][symbolKey].push(curr["危险性分类及说明"]);
      return acc;
    }, {});
  };

  const showAllCategories = () => {
    setCategoryList(processCategoryData(CategoryData));
    setShowCheckboxList(true);
    setHasSearched(false);
    setShowAll(true);
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

 
  return (
    <div>
      <Navbar />
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
        <div className="nav-container fixed">
          <a href="/" className="active" >
            <div className="nav-item mt-3">
              库存临界值（Q）
            </div>
          </a>
          <a href="/toxic-gas">
            <div className="nav-item mt-3">
              有毒气体校正指数（β）
            </div>
          </a>
          <a href="/personnel-auth">
            <div className="nav-item mt-3">
            人员校正系数（α）
            </div>
          </a>
          <a href="/major-hazard">
            <div className="nav-item mt-3">
            重大危险源辨识指标（S）
            </div>
          </a>
          <a href="/major-hazard-ranking">
            <div className="nav-item mt-3">
            重大危险源分级指标（R）
            </div>
          </a>
          </div>
        
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
          <RightContentTop title="库存临界值（Q)" description="根据化学品信息或危险品类别进行搜索计算" />
          <div className="d-lg-flex p-2" style={{ gap: '8px' }}>
            <div className="search-container">
              <input
              type="text"
              placeholder="请输入危险品类别，用“,”分割"
              value={inputValue}
              onChange={handleInputChange}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
            搜索
          </button>
          </div>
          <div className="checkbox-list mt-2">
                  {showCheckboxList && currentItems.map(([categoryName, symbols]) => (
                    <div key={categoryName}>
                      <div className="category-list-title">{categoryName}</div>
                      <ul className="list-item">
                        {Object.entries(symbols).map(([symbol, descriptions]) => (
                          Array.isArray(descriptions) ? descriptions.map((description, descIndex) => (
                            <li key={`${categoryName}-${symbol}-${description}`}>
                              <span>
                                <input
                                  type="checkbox"
                                  id={`category-${categoryName}-${symbol}-${description}`}
                                  name={`category-${categoryName}-${symbol}-${description}`}
                                  className="custom-checkbox-input"
                                  checked={selectedItems.some(item => item.category === categoryName && item.symbol === symbol && item.description === description)}
                                  onChange={() => handleCheckboxChange(categoryName, symbol, description)}
                                />
                                <label htmlFor={`category-${categoryName}-${symbol}-${description}`} className="custom-checkbox-label">
                                  {description}
                                </label>
                               </span>
                            </li>
                          )) : null 
                        ))}
                      </ul>
                </div>
              ))}
            </div>
            <div className="mt-2">
            {hasSearched && (
                <ul className="list-item">
                  <li className="more">
                  <a href="#" onClick={showAllCategories}>
                    无匹配结果，显示所有选项
                  </a>
                </li>
              </ul>
              )}
            </div>
            {showAll && (
              <PaginationComponent
                currentPage={currentPage}
                pageCount={pageCount}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                handlePageChange={handlePageChange}
              />
            )}         
          <div className="d-flex mt-3" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <span className="color-blue mt-1"  style={{ marginRight:'10px' }}>返回按化学品名称搜索</span>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <button
                className={`category-btn d-flex align-items-center justify-content-center`}
               
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={CategoryBtn} className="d-inline-block align-top" alt="Category" />
                  <span>按化学品名称搜索</span>
                </div>
              </button>
            </Link>
          </div>
          <div className="selected-list mt-3">
          <ul className="list-item">
    {selectedItems.map((item, index) => (
      <li key={index}>
        <span>{item.description}</span>
        <button className="delete" onClick={() => handleDeleteItem(item)}>删除</button>
      </li>
    ))}
  </ul>
  <div className="count-wrap">
        <p>库存临界值结果（Q）：<span className="count">{totalCount}</span>（吨）</p>
        <button className="clear" onClick={handleClear}>清空</button>
      </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category



