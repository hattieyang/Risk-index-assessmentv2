import React from 'react'
import "../styles/Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <div className="footer-service">
          <p>服务科技与工业发展 造福人类</p>
          <div className="footer-qr">
            <img src="https://www.jkchemical.com/images/qrcode.jpg" style={{ width: '100px' }} alt="QR Code" />
            <p>关注微信公众号</p>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-company">
            <p>百灵威集团</p>
            <a href="https://www.jkchemical.com/ch/about">公司简介</a>
            <a href="https://www.jkchemical.com/ch/promise">企业承诺</a>
            <a href="https://www.jkchemical.com/ch/recommended-brand">合作品牌</a>
            <a href="https://www.jkchemical.com/job">招贤纳士</a>
          </div>
          <div className="footer-resources">
            <p>浏览</p>
            <a href="https://www.jkchemical.com/information">资讯中心</a>
            <a href="https://www.jkchemical.com/product/mscu/msds">安全说明书(SDS)</a>
            <a href="https://www.jkchemical.com/product-catalog">产品</a>
          </div>
          <div className="footer-contact">
            <p>联系我们</p>
            <p>邮箱：sourcing6@jkchemical.com</p>
            <p>电话：010-80795999</p>
            <p>传真：010-80793233</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
