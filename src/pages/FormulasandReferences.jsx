import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/All.css';
import rimage from "../assets/r-image.png";
import simage from "../assets/s-image.png";
import AppendixA from "../assets/AppendixA.png";
import { additionalChemicalData } from '../Content/additionalChemicalData';
import { CategoryData } from '../Content/CategoryData';
import { toxicgas_t3 } from '../Content/toxicgas_t3';
import { toxicgas_t4 } from '../Content/toxicgas_t4';
import { alphavalue_t5 } from '../Content/alphavalue_t5';
import { riskranks_t6 } from '../Content/riskranks_t6';

function FormulasandReferences() {
  const [activeNav, setActiveNav] = useState('');

  const handleNavClick = (id) => {
    setActiveNav(id);
    // Scroll to the section
    const section = sectionsRef.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sectionsRef = useRef({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -81% 0px",
        threshold: [0, 0 ,0, 0],
      }
    );
  
    Object.entries(sectionsRef.current).forEach(([key, ref]) => {
      if (ref) observer.observe(ref);
    });
  
    return () => {
      Object.entries(sectionsRef.current).forEach(([key, ref]) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  
  
  return (
    <div>
      <div className="wrap-line">
        <div className="container">
            <nav>
                <ul className="nav-list d-flex">
                    <li>
                      <NavLink to="/" >危险指数测算</NavLink>
                    </li>
                    <li>
                    <NavLink to="/FormulasandReferences" activeClassName="active-link">公式与参考资料</NavLink>

                    </li>
                </ul>
            </nav>
        </div>
    </div>
     
      <div className="container d-lg-flex p-4 pt-2">
        <div className="p-2 col-lg-3 col-sm-12">
        <div className="nav-container fixed  mt-132">
          <a href="#first" onClick={() => handleNavClick('first')}>
            <div className={`nav-item mt-3 ${activeNav === 'first' ? 'active' : ''}`}
            onClick={() => handleNavClick('first')}>
             危险化学品名称及其临界量Q
            </div>
          </a>
          <a href="#second" onClick={() => handleNavClick('second')}>
            <div className={`nav-item mt-3 ${activeNav === 'second' ? 'active' : ''}`}
            onClick={() => handleNavClick('second')}>
             重大危险源辨识指标S计算方法
            </div>
          </a>
          <a href="#third" onClick={() => handleNavClick('third')}>
            <div className={`nav-item mt-3 ${activeNav === 'third' ? 'active' : ''}`}
            onClick={() => handleNavClick('third')}>
              重大危险源分级指标R计算方法
            </div>
          </a>
          <a href="#fourth" onClick={() => handleNavClick('fourth')}>
            <div className={`nav-item mt-3 ${activeNav === 'fourth' ? 'active' : ''}`}
            onClick={() => handleNavClick('fourth')}>
             毒性气体校正系数β取值表
            </div>
          </a>
          <a href="#fifth" onClick={() => handleNavClick('fifth')}>
            <div className={`nav-item mt-3 ${activeNav === 'fifth' ? 'active' : ''}`}
            onClick={() => handleNavClick('fifth')}>
             校正系数α取值表
            </div>
          </a>
          <a href="#sixth" onClick={() => handleNavClick('sixth')}>
            <div className={`nav-item mt-3 ${activeNav === 'sixth' ? 'active' : ''}`}
            onClick={() => handleNavClick('sixth')}>
              重大危险源级别和R值的对应关系
            </div>
          </a>
          </div>
        </div>
        <div className="right-content p-4 col-lg-9 col-sm-12 mt-132">
          <p className="title">公式与参考资料</p>
          <section id="first" ref={(el) => (sectionsRef.current["first"] = el)}>
            <p className="description">危险化学品名称及其临界量Q</p>
            <p style={{ fontSize: '12px', lineHeight: '22px' }}>危险化学品临界量的确定方法如下：<br></br>
              a） 在表1范围内的危险化学品，其临界量应按表1确定；<br></br>
              b） 未在表1范围内的危险化学品，依据其危险性，按表2确定临界量；若一种危险化学品具有多种危险性，按其中最低的临界量确定。</p>
            <h3 style={{ fontSize: '18px', textAlign: 'center' }}>
            表1 危险化学品名称及其临界量
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>危险化学品名称和说明</th>
                    <th>别名</th>
                    <th>CAS号</th>
                    <th>临界量（t）</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalChemicalData.map((row, index) => (
                    <tr key={index}>
                      <td>{row["序号"]}</td>
                      <td>{row["危险化学品名称"]}{row["说明"]}</td>
                      <td>{row["别名"]}</td>
                      <td>{row["CAS号"]}</td>
                      <td>{row["临界量（t）"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-4" style={{ fontSize: '18px', textAlign: 'center' }}>
            表2 未在表1中列举的危险化学品类别及其临界量
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>符号</th>
                    <th>危险性分类及说明</th>
                    <th>临界量（t）</th>
                  </tr>
                </thead>
                <tbody>
                  {CategoryData.map((row, index) => (
                    <tr key={index}>
                      <td>{row["类别"]}</td>
                      <td>{row["符号"]}</td>
                      <td>{row["危险性分类及说明"]}</td>
                      <td>{row["临界量（t）"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="second" ref={(el) => (sectionsRef.current["second"] = el)}>
            <p className="description mt-4">重大危险源辨识指标S计算方法</p>
            <p style={{ fontSize: '12px', lineHeight: '22px' }}>生产单元、储存单元内存在危险化学品的数量等于或超过表1、表2规定的临界量，即被定为重大危险源。单元内存在的危险化学品的数量根据危险化学品种类的多少区分为以下两种情况：<br></br>
            a） 生产单元、储存单元内存在的危险化学品为单一品种时，该危险化学品的数量即为单元内危险化学品的总量，若等于或超过相应的临界量，则定为重大危险源。<br></br>
            b） 生产单元、储存单元内存在的危险化学品为多品种时，按式（1）计算，若满足式（1），则定为重大危险源：</p>
            <img src={simage} style={{width:'600px'}}></img>
            <p style={{ fontSize: '12px', lineHeight: '22px' }}>式中：<br></br>
            S----辨识指标；<br></br>
            q1，q2，…，qn ----每种危险化学品的实际存在量，单位为吨（t）；<br></br>
            Q1，Q2，…，Qn  ----与各危险化学品相对应的临界量，单位为吨（t）。<br></br>
            危险化学品储罐以及其他容器、设备或仓储区的危险化学品的实际存在量按设计最大量确定。<br></br>
            对于危险化学品混合物，如果混合物与其纯物质属于相同危险类别，则视混合物为纯物质，按混合物整体进行计算。如果混合物与其纯物质不属于相同危险类别，则应按新危险类别考虑其临界量。<br></br>
            危险化学品重大危险源的辨识流程参见附录A。</p>
          </section>
          <section id="third" ref={(el) => (sectionsRef.current["third"] = el)}>
            <p className="description mt-4">重大危险源分级指标R计算方法</p>
            <p style={{ fontSize: '12px', lineHeight: '22px' }}>采用单元内各种危险化学品实际存在量与其相对应的临界量比值，经校正系数校正后的比值之和R作为分级指标。<br></br>
  重大危险源的分级指标按照按式（2）计算。</p>
            <img src={rimage} style={{width:'600px'}}></img>
            <p style={{ fontSize: '12px', lineHeight: '22px' }}>式中：<br></br>
            R----重大危险源分级指标；<br></br>
            q1，q2，…，qn ----每种危险化学品实际存在量，单位为吨（t）；<br></br>
            Q1，Q2，…，Qn  ----与各危险化学品相对应的临界量，单位为吨（t）。<br></br>
            β1，β2，…，βn----与各危险化学品相对应的校正系数；<br></br>
            α----该危险化学品重大危险源厂区外暴露人员的校正系数。</p>
          </section>
          <section id="fourth" ref={(el) => (sectionsRef.current["fourth"] = el)}>
            <p className="description mt-4">毒性气体校正系数β取值表</p>
            <p style={{ fontSize: '12px'}}>根据单元内危险化学品的类别不同，设定校正系数β值。在表3范围内的危险化学品，其β值按表3确定；未在表3范围内的危险化学品，其β值按表4确定。</p>
            <h3 className="mt-4" style={{ fontSize: '18px', textAlign: 'center' }}>
            表3 毒性气体校正系数β取值表
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
            <h3 className="mt-4" style={{ fontSize: '18px', textAlign: 'center' }}>
            表4 未在表3中列举的危险化学品校正系数β取值表
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>符号</th>
                    <th>β校正系数</th>
                  </tr>
                </thead>
                <tbody>
                  {toxicgas_t4.map((row, index) => (
                    <tr key={index}>
                      <td>{row["类别"]}</td>
                      <td>{row["符号"]}</td>
                      <td>{row["β校正系数"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="fifth" ref={(el) => (sectionsRef.current["fifth"] = el)}>
            <p className="description mt-4">校正系数α取值表</p>
            <p style={{ fontSize: '12px'}}>根据危险化学品重大危险源的厂区边界向外扩展500米范围内常住人口数量，按照表5设定暴露人员校正系数α值。</p>
            <h3 className="mt-4" style={{ fontSize: '18px', textAlign: 'center' }}>
            表5 校正系数α取值表
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>厂外可能暴露人员数量</th>
                    <th>α</th>
                  </tr>
                </thead>
                <tbody>
                  {alphavalue_t5.map((row, index) => (
                    <tr key={index}>
                      <td>{row["厂外可能暴露人员数量"]}</td>
                      <td>{row["α"]}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="sixth" ref={(el) => (sectionsRef.current["sixth"] = el)}>
            <p className="description mt-4">重大危险源分级标准</p>
            <p style={{ fontSize: '12px'}}>根据计算出来的R值，按表6确定危险化学品重大危险源的级别。</p>
            <h3 className="mt-4" style={{ fontSize: '18px', textAlign: 'center' }}>
            表6 重大危险源级别和R值的对应关系
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>重大危险源级别</th>
                    <th>R值</th>
                  </tr>
                </thead>
                <tbody>
                  {riskranks_t6.map((row, index) => (
                    <tr key={index}>
                      <td>{row["重大危险源级别"]}</td>
                      <td>{row["R值"]}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="description mt-4">附录A（资料性附录）危险化学品重大危险源辨识流程</p>
            <p style={{ fontSize: '12px'}}>危险化学品重大危险源辨识流程，见图A.1。</p>
            <h3 className="mt-4 mb-3" style={{ fontSize: '18px', textAlign: 'center' }}>
            图A.1  危险化学品重大危险源辨识流程图
            </h3>
            <div style={{ textAlign: 'center' }}>
            <img src={AppendixA} style={{width:'600px'}}></img>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default FormulasandReferences
