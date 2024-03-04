import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import SideNavbar from '../components/SideNavbar'; 
import ListComponent from '../components/ListComponent'; 
import PaginationComponent from '../components/PaginationComponent'; 
import SearchComponent from '../components/SearchComponent'; 
import SelectedItemsComponent from '../components/SelectedItemsComponent';
import RightContentTop from '../components/RightContentTop'; 
import { additionalChemicalData } from "../Content/additionalChemicalData"; 
import CategoryBtn from "../assets/category-btn-icon.svg"; 
import '../styles/All.css'; 
import { Link } from 'react-router-dom';

function Home() {
  // State variables
  const [inputValue, setInputValue] = useState(''); // User input value
  const [listItems, setListItems] = useState([]); // List items
  const [selectedItems, setSelectedItems] = useState({}); // Selected items
  const [hasSearched, setHasSearched] = useState(false); // Indicates if search has been performed
  const [chemicals, setChemicals] = useState([]); // Chemical data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 10; // Number of items per page
  const [pageCount, setPageCount] = useState(0); // Total page count
  const [showAll, setShowAll] = useState(false); // Indicates if all items are shown
  const [isChecked, setIsChecked] = useState(false); // Checkbox status
  const [hasSelectedFirstItem, setHasSelectedFirstItem] = useState(false); // Indicates if the first item is selected
  const [selectedListItems, setSelectedListItems] = useState([]); // Selected items list

  // Event handler for checkbox change
  const handleEnableButtonClick = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    // Load chemicals from additionalChemicalData and transform them into a suitable format
    const loadedChemicals = additionalChemicalData.map((chemical, index) => ({
      id: index.toString(), 
      label: chemical["危险化学品名称"],
      alias: chemical["别名"],
      value: chemical["CAS号"],
      number: chemical["临界量（t）"]
    }));
    setChemicals(loadedChemicals);
    setPageCount(Math.ceil(loadedChemicals.length / itemsPerPage));
  }, []);

  // Event handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Event handler for checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
  
    setSelectedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  
    if (!hasSelectedFirstItem && checked) {
      setHasSelectedFirstItem(true);
    }
  
    if (checked) {
      const selectedItem = chemicals.find((chemical) => chemical.id === id);
      setSelectedListItems((prevSelectedListItems) => [...prevSelectedListItems, selectedItem]);
    } else {
      // Remove the item from selectedListItems when unchecked
      setSelectedListItems((prevSelectedListItems) =>
        prevSelectedListItems.filter((item) => item.id !== id)
      );
    }
  };

  const matchesCasSegment = (casNumber, searchTerm) => {
    const casSegments = casNumber.split('-').map(segment => segment.trim());
    const searchSegments = searchTerm.split('-').map(segment => segment.trim());
  
    return searchSegments.every(searchSegment =>
      casSegments.some(casSegment =>
        casSegment === searchSegment || casSegment.startsWith(searchSegment)
      )
    );
  };
  // Event handler for search
  const handleSearch = () => {
    let filteredList = []; 
    if (inputValue.trim()) {
      const searchTerms = inputValue.split(',').map(term => term.trim().toLowerCase());

      filteredList = chemicals.filter(item => {
        const name = item.label ? item.label.toLowerCase() : '';
        const aliases = item.alias ? item.alias.toLowerCase().split(';').map(alias => alias.trim()) : [];
        // Normalize the CAS number for comparison
        const casNumber = item.value ? item.value.toLowerCase() : '';

        return searchTerms.some(term =>
          (term.length >= 3 && matchesCasSegment(casNumber, term)) || // Only search when at least three characters are entered for CAS
          (term.length > 1 && name.includes(term)) ||
          aliases.some(alias => alias.includes(term))
        );
      });

      setListItems(filteredList);
      setHasSearched(true);
      setShowAll(false);
    } else {
      setListItems([]);
      setHasSearched(false);
    }
    // Do not reset selectedItems
    setCurrentPage(1);
  };

  // Event handler for page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * itemsPerPage;
    setListItems(chemicals.slice(startIndex, startIndex + itemsPerPage));
  };

  // Event handler for previous page
  const handlePreviousPage = () => {
    handlePageChange(Math.max(currentPage - 1, 1));
  };

  // Event handler for next page
  const handleNextPage = () => {
    handlePageChange(Math.min(currentPage + 1, pageCount));
  };

  // Render pagination component
  const renderPagination = () => {
    if (showAll && listItems.length > 0) {
      return (
        <PaginationComponent
          currentPage={currentPage}
          pageCount={pageCount}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
        />
      );
    }
    return null;
  };

  // Event handler for showing all items
  const handleShowAllItems = () => {
    setCurrentPage(1); 
    setListItems(chemicals.slice(0, itemsPerPage)); 
    setHasSearched(false); 
    setShowAll(true); 
  };

  // Event handler for deleting an item
  const handleDeleteItem = (id) => {
    // Update selectedListItems state by removing the item with the specified id
    setSelectedListItems(prevItems => prevItems.filter(item => item.id !== id));
    
    setSelectedItems(prev => {
      const newSelectedItems = {...prev};
      delete newSelectedItems[id];
      return newSelectedItems;
    });
  };

  const handleClear = () => {
    setSelectedListItems([]); 
    setSelectedItems({}); 
    setHasSelectedFirstItem(false); 
  };

  // Calculate total count based on selectedListItems
  const totalCount = selectedListItems.reduce((sum, item) => sum + item.number, 0);


  return (
    <div>
      <Navbar />
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
          <SideNavbar />
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
          <RightContentTop title="库存临界值（Q)" description="根据化学品信息或危险品类别进行搜索计算" />
          <SearchComponent
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          <ListComponent
            listItems={listItems}
            handleCheckboxChange={handleCheckboxChange}
            showAll={showAll}
            handleShowAllItems={handleShowAllItems}
            selectedItems={selectedItems} // Pass selectedItems as a prop
            hasSearched={hasSearched} // Pass hasSearched as a prop
          />
          {renderPagination()}
          <div className="d-flex mt-3" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <span className="color-blue mt-1">按化学品名称搜索无结果，切换至按类别搜索</span>
            <span>
              <input 
                type="checkbox" 
                id="confirm" 
                name="confirm" 
                className="custom-checkbox-input" 
                value="" 
                onChange={handleEnableButtonClick} 
              />
              <label htmlFor="confirm" className="custom-checkbox-label-confirm mr-2">确认</label>
            </span>
            <Link to="/category" style={{ textDecoration: 'none', color: 'inherit' }}>
              <button
                className={`category-btn d-flex align-items-center justify-content-center ${!isChecked ? 'disabled' : ''}`}
                disabled={!isChecked}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={CategoryBtn} className="d-inline-block align-top" alt="Category" />
                  <span style={{ pointerEvents: 'none' }}>按化学品类别搜索</span>
                </div>
              </button>
            </Link>
          </div>
          <SelectedItemsComponent
            selectedListItems={selectedListItems}
            totalCount={totalCount}
            handleDeleteItem={handleDeleteItem}
            handleClear={handleClear}
          />
            
        </div>
      </div>
    </div>
  );
}

export default Home;
