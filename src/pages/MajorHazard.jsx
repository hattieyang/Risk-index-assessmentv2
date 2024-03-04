import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import RightContentTop from '../components/RightContentTop';
import '../styles/All.css';
import trash from "../assets/trash.svg";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import ok from "../assets/ok.svg"; 
function MajorHazard() {
  const [products, setProducts] = useState([{
    id: 1,
    name: '产品1',
    q: '', // Quantity of hazardous material
    Q: '', // Critical stock value
    selected: false,
    isEditing: false,
  }]);
  const [nextProductId, setNextProductId] = useState(2);
  const [selectAll, setSelectAll] = useState(false);

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
  
 // Function to handle select all products
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
  // Function to delete selected products
  const deleteSelectedProducts = () => {
    const filteredProducts = products.filter(product => !product.selected);
    setProducts(filteredProducts);
    setSelectAll(false);
  };
   // Function to handle checkbox change for product selection
  const handleCheckboxChange = (id) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        // Toggle the 'selected' state
        return { ...product, selected: !product.selected };
      }
      return product;
    }));
  };
   
   // Function to update q and Q values
   const handleValueChange = (id, field, value) => {
    const newValue = value === '' ? '' : Number(value);
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: newValue } : product
    ));
  };

  // Function to calculate S
  const calculateS = () => {
    return products.reduce((acc, {q, Q}) => acc + (Q > 0 ? q / Q : 0), 0);
  };
  return (
    <div>
      <Navbar />
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
          <SideNavbar />
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12">
          <RightContentTop title="重大危险源辨识指标（S）" description="直接添加产品相关系数得到结果" />
          <div className="d-flex" style={{ paddingLeft: '18px', paddingTop: '4px' }}>
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
        
          {products.map((product) => (
            <div key={product.id} className="d-flex d-flex-product-list p-3 align-items-center">
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
              <div className="d-flex product-list-right">
                <span className="sub-title"><span className="red">*</span>危险品数量（q）</span>
                  <div class="input-group">
                    <input 
                      type="number" 
                      className="form-control" 
                      value={product.q}
                      onChange={(e) => handleValueChange(product.id, 'q', e.target.value)}
                    />
                      <div class="input-group-append">
                          <span class="input-group-text">吨</span>
                      </div>
                  </div>
              </div>
              <div className="d-flex product-list-right">
                  <span className="sub-title"><span className="red">*</span>库存临界值（Q）</span>
                    <div class="input-group">
                      <input 
                        type="number" 
                        className="form-control" 
                        value={product.Q}
                        onChange={(e) => handleValueChange(product.id, 'Q', e.target.value)}
                      />
                      <div class="input-group-append">
                            <span class="input-group-text">吨</span>
                      </div>
                    </div>
              </div>                     
            </div>
          ))}

         <button className="add-product p-3" onClick={(e) => { e.preventDefault(); addProduct(); }}><img src={add} className="d-inline-block align-top" alt="add"/>添加新产品</button>
          <div className="selected-list mt-3">
          <div className="count-wrap"><p>重大危险源辨识指标（S）：<span className="count">{calculateS().toFixed(2)}</span></p>
             <button className="clear" onClick={() => setProducts([])}>清空</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MajorHazard;
