import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import Accordion from '../components/Accordion';
import '../styles/Accordion.css';
import download from "../assets/download.svg";
import upload from "../assets/upload.svg";
import trash from "../assets/trash.svg";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import ok from "../assets/ok.svg";
import CategoryBtn from "../assets/category-btn-icon.svg";
import BubbleBox from "../components/BubbleBox";
import Dropdown from '../components/Dropdown'; // Adjust the import path as necessary

function MajorHazardRanking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalRisk, setTotalRisk] = useState(0);
  const [products, setProducts] = useState([{
    id: 1,
    name: '产品1',
    quantity: '', // 危险品数量（q）
    threshold: '', // 库存临界值（Q）
    correctionIndex: '', // 有毒气体校正指数（β）
    riskContribution: 0, // 风险值贡献
    selected: false,
    isEditing: false,
  }]);
  const [nextProductId, setNextProductId] = useState(2);
  const [selectAll, setSelectAll] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [correctionCoefficient, setCorrectionCoefficient] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const [selection, setSelection] = useState(''); // Initialize the selection state

  const calculateRiskContribution = (product) => {
  const quantity = parseFloat(product.quantity) || 0;
  const threshold = parseFloat(product.threshold) || 0;
  const correctionIndex = parseFloat(product.correctionIndex) || 0;
    return threshold !== 0 ? (correctionIndex * quantity / threshold) : 0;
  };

  const updateTotalRisk = () => {
    const total = products.reduce((sum, product) => sum + calculateRiskContribution(product), 0);
    setTotalRisk(correctionCoefficient * total);
  };

  useEffect(() => {
    updateTotalRisk();
  }, [products, correctionCoefficient]);

  const dropdownOptions = ['按危险度排列', '按数量排列', '按临界值排列', '按气体校正指数'];
  const sortProducts = (option) => {
    setSelection(option); // Update the current selection
    let sortedProducts = [...products];
    const multiplier = sortAscending ? 1 : -1;
    switch (option) {
      case '按危险度排列':
        sortedProducts.sort((a, b) => (calculateRiskContribution(b) - calculateRiskContribution(a)) * multiplier);
        break;
      case '按数量排列':
        sortedProducts.sort((a, b) => (parseFloat(b.quantity) - parseFloat(a.quantity)) * multiplier);
        break;
      case '按临界值排列':
        sortedProducts.sort((a, b) => (parseFloat(b.threshold) - parseFloat(a.threshold)) * multiplier);
        break;
      case '按气体校正指数':
        sortedProducts.sort((a, b) => (parseFloat(b.correctionIndex) - parseFloat(a.correctionIndex)) * multiplier);
        break;
      default:
        break; // No sorting if option doesn't match
    }
    setProducts(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
    if (selection) {
      sortProducts(selection); // Re-sort with the current selection
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const determineHazardLevel = (R) => {
    // Check if R is not a number or if there are no products to calculate the risk
    if (isNaN(R) || R === 0) return 0; // Return 0 if there's no valid risk value
  
    if (R >= 100) return 1; // 一级
    if (R >= 50) return 2;  // 二级
    if (R >= 10) return 3;  // 三级
    return 4;               // 四级
  };


  // Function to calculate correction coefficient
  const calculateCoefficient = () => {
  const number = parseInt(inputValue, 10);
    let coefficient = 0.5; // Base coefficient for non-negative numbers

    if (isNaN(number) || number < 0) {
      coefficient = 0; // Set to 0 for invalid input
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

  // Use useEffect to call calculateCoefficient whenever inputValue changes
  useEffect(() => {
    calculateCoefficient();
  }, [inputValue]);
  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // Add a new product
  const addProduct = () => {
  const newName = `产品${nextProductId}`;
  const newProduct = {
      id: nextProductId,
      name: newName,
      selected: false,
      isEditing: false,
    };
    setProducts([...products, newProduct]);
    setNextProductId(nextProductId + 1); // Prepare ID for the next product
  };
    // Toggle the editing state of a product
  const toggleEditProductName = (id) => {
      setProducts(products.map(product => 
        product.id === id ? { ...product, isEditing: !product.isEditing } : product
      ));
    };
  
    // Update the product's name based on user input
  const handleProductNameChange = (id, newName) => {
      setProducts(products.map(product => 
        product.id === id ? { ...product, name: newName } : product
      ));
    };
  
// Function to handle changes to quantity (q)
  const handleQuantityChange = (id, value) => {
  setProducts(products.map(product =>
    product.id === id ? { ...product, quantity: value } : product
  ));
  updateTotalRisk(); // Update total risk when quantity changes
  };

// Function to handle changes to threshold (Q)
  const handleThresholdChange = (id, value) => {
  setProducts(products.map(product =>
    product.id === id ? { ...product, threshold: value } : product
  ));
  updateTotalRisk(); // Update total risk when threshold changes
};

  // Function to handle changes to correction index (β)
  const handleCorrectionIndexChange = (id, value) => {
  setProducts(products.map(product =>
    product.id === id ? { ...product, correctionIndex: value } : product
  ));
  updateTotalRisk(); // Update total risk when correction index changes
  };

  const handleSelectAll = (event) => {
    const newSelectAllState = event.target.checked;
    setSelectAll(newSelectAllState);
    const updatedProducts = products.map(product => ({
      ...product,
      selected: newSelectAllState,
    }));
    setProducts(updatedProducts);
  };

  const handleProductSelect = (id) => {
    const updatedProducts = products.map(product => ({
      ...product,
      selected: product.id === id ? !product.selected : product.selected,
    }));
    setProducts(updatedProducts);
  };

  const deleteSelectedProducts = () => {
    const filteredProducts = products.filter(product => !product.selected);
    setProducts(filteredProducts);
    setSelectAll(false);
  };
  const handleCheckboxChange = (id) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        // Toggle the 'selected' state
        return { ...product, selected: !product.selected };
      }
      return product;
    }));
  };
  const pdfRef = useRef(); 
  const clearAllNumbers = () => {
    // Reset the products with their numeric values cleared
    const clearedProducts = products.map(product => ({
      ...product,
      quantity: '', // Reset quantity
      threshold: '', // Reset threshold
      correctionIndex: '', // Reset correction index
      riskContribution: 0, // Reset risk contribution
    }));
  
    setProducts(clearedProducts);
    setTotalRisk(0); // Reset total risk
    setCorrectionCoefficient(0); // Reset correction coefficient
    setInputValue(''); // Clear the input field
  };
  
  const downloadPdfDocument = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
    });
  
    // Function to render a single item to the PDF
    const renderItemToPDF = async (item, currentPageHeight, pdf) => {
      const canvas = await html2canvas(item);
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Check if new page is needed
      if (currentPageHeight + pdfHeight > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        currentPageHeight = 0; // Reset current page height for new page
      }
  
      pdf.addImage(imgData, 'PNG', 0, currentPageHeight, pdfWidth, pdfHeight);
      return currentPageHeight + pdfHeight; // Return updated page height
    };
  
    let currentPageHeight = 0;
  
    // Render d-flex-product-list items
    const productListItems = document.querySelectorAll('.d-flex-product-list');
    for (const item of productListItems) {
      currentPageHeight = await renderItemToPDF(item, currentPageHeight, pdf);
    }
  
    // Render pdf-wrap
    const selectedTotel = document.querySelector('.pdf-wrap');
    if (selectedTotel) {
      currentPageHeight = await renderItemToPDF(selectedTotel, currentPageHeight, pdf);
    }
  
    pdf.save('download.pdf');
  };
  
  

  
  const items = [
    {
      title: (
        <div>
          <span>批量上传</span>
          <button　className="download"><img src={download} className="d-inline-block align-top" alt="download"/>下载模板</button> 
        </div>
      ), 
      content: <div className="upload-container">
                <button className="upload-button"><img src={upload} className="d-inline-block align-top" alt="upload"/>上传文件</button>
              </div>
    },
    {
      title: <span>手动填写</span>, 
      content: 
      <div>
        <p className="accordion-title mt-2">人员校正系数</p>
        <div className="d-flex x-line">
            <div className="d-flex">
              <label htmlFor="fname">*库存参与人员　</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={inputValue}
                onChange={handleInputChange}
              ></input>
                <BubbleBox title="人员校正系数" bubbleContent="危险化学品重大危险源的厂区边界向外扩展500米范围内常住人口数量"/> 
            </div>
            <p className="mb-0 p-4 pt-0 pb-0">人数指数correction coefficient（α）：<span className="red">{correctionCoefficient}</span></p>
          </div>
          <p className="accordion-title mt-3">其他系数</p>
          <div className="d-flex">
            <div className="product-chosen mr-2">已选择 <span className="red">{products.filter(product => product.selected).length}</span> 件产品</div>
            <div className="all-select">
            <input
                type="checkbox"
                id="selectAll"
                name="selectAll"
                className="custom-checkbox-input"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label htmlFor="selectAll" className="custom-checkbox-label">全选</label>
              <button className="top-delete" onClick={(e) => { e.preventDefault(); deleteSelectedProducts(); }}>
                <img src={trash} className="d-inline-block align-top" alt="trash"/>删除
            </button>
            </div>
          </div>
            <div className="d-flex align-items-center mt-3" style={{ gap: '8px', paddingBottom: '20px', borderBottom: '1px solid #A6A7AA' }}>
              <button className="change-method"　onClick={toggleSortOrder}>
                <img src={CategoryBtn} className="d-inline-block align-top" alt="CategoryBtn"/>
              </button>

              <Dropdown options={dropdownOptions} onOptionSelected={sortProducts} />


              <div className="d-lg-flex w-100" style={{ gap: '8px' }}>
                <div className="search-container flex-grow-1">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="输入化学品名称进行搜索"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="product-list-wrap">
            {products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((product) => (
           
              <div key={product.id} className="d-flex-product-list p-3 align-items-center">
                <div className="d-flex">
                  <div className="all-select first">
                    <input
                      type="checkbox"
                      id={`product-${product.id}`}
                      name={`product-${product.id}`}
                      className="custom-checkbox-input"
                      checked={product.selected}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                    {product.isEditing ? (
                      <div className="d-flex">
                        <input 
                          type="text"
                          value={product.name}
                          className="form-control"
                          onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                        />
                        <button className="ok-wrap" onClick={() => toggleEditProductName(product.id)} >
                          <img src={ok} className="d-inline-block align-top" alt="OK"/>
                        </button>
                      </div>
                    ) : (
                      <>
                        <label htmlFor={`product-${product.id}`} className="custom-checkbox-label mr-2">
                          {product.name}
                        </label>
                        <button onClick={() => toggleEditProductName(product.id)} style={{ border: 'none', background: 'none', padding: 0 }}>
                          <img src={edit} className="d-inline-block align-top" alt="edit"/>
                        </button>
                      </>
                    )}
                  </div>
                  {/* 危险品数量（q）input */}
                  <div className="d-flex product-list-right">
                    <span className="sub-title"><span className="red">*</span>危险品数量（q）</span>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">吨</span>
                      </div>
                    </div>
                  </div>
                  {/* 库存临界值（Q）input */}
                  <div className="d-flex product-list-right">
                    <span className="sub-title"><span className="red">*</span>库存临界值（Q）</span>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={product.threshold}
                        onChange={(e) => handleThresholdChange(product.id, e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">吨</span>
                      </div>
                    </div>
                  </div>
                  {/* 有毒气体校正指数（β）input */}
                <div className="d-flex product-list-right">
                  <span className="sub-title"><span className="red">*</span>有毒气体校正指数（β）</span>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={product.correctionIndex}
                      onChange={(e) => handleCorrectionIndexChange(product.id, e.target.value)}
                      placeholder="非气体为1"
                    />
                  </div>
                </div>
                </div>           
                <div className="note mt-2">
                  危险品风险值贡献：<span>{calculateRiskContribution(product).toFixed(2)}</span>
                </div>

              </div>
          
            
          ))}
            </div>
           {searchQuery === '' ? (
        <div>
          <button className="add-product p-3" onClick={(e) => { e.preventDefault(); addProduct(); }}><img src={add} className="d-inline-block align-top" alt="add"/>添加新产品</button> 
        </div>
      ) : null}
           
      </div>
  
    },

  ];
  
  return (
    <div>
       <Navbar />
      <div className="container d-lg-flex p-4 pt-2 mt-132">
        <div className="p-2 col-lg-3 col-sm-12">
          <SideNavbar />
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
        <p className="title">重大危险源分级指标（R）</p>

        <Accordion items={items} />
        <div class="selected-list mt-3">
          <div className="pdf-wrap" ref={pdfRef}>
            <div class="count-wrap border-bottom pt-3 pb-3"><p>重大危险源分级指标（R）<span class="red">{totalRisk.toFixed(2)}</span></p>
            </div>
            <div className="count-wrap border-bottom pt-3 pb-3">
              <p>重大危险源级别：<span className="red">{determineHazardLevel(totalRisk)}</span></p>
            </div>
          </div>
            <div className="count-wrap mt-3 mb-2">
              <button　 onClick={downloadPdfDocument} className="download"><img src={download} className="d-inline-block align-top" alt="download"/>下载方案PDF</button> 
              <button className="clear" onClick={clearAllNumbers}>清空</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MajorHazardRanking
