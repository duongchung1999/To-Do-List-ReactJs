import React, { Component } from 'react';
import imageHome from '../../assets/image/Home.png';
import imageBook1 from '../../assets/image/book1.png';
import imageHanziDic from '../../assets/image/ic_logo.png';
import imageConvert from '../../assets/image/convert.jpg';
import imagePdf from '../../assets/image/pdf1.png';
import imageStickyNote from '../../assets/image/book2.jpg';
import imageYoutube from '../../assets/image/youtube.png';
import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {
        return (
        <div className={this.props.isMenuOnClick?"header js-header":"hidden"}>
          <ul id="nav">
            <UlComponent link="/" image = {imageStickyNote} Name = "Home"/>
            <UlComponent link="/convertText" image = {imageHome} Name = "Convert Text"/>
            <UlComponent link="/jiaocheng" image = {imageBook1} Name = "教程"/>
            <UlComponent link="/nhidonghocphat" 
            image = "https://ava-grp-talk.zadn.vn/2/b/e/8/2/360/056059ce9cbe0aa7b902032495aef1c6.jpg" 
            Name = "Website"/>
            <UlComponent link="/hanzi" image = {imageHanziDic} Name = "Hanzi Dict"/>
            <UlComponent link="/tudiendich" image = {imageConvert} Name = "Convert"/>
            <UlComponent link="/pdfGiaotrinh" image = {imagePdf} Name = "PDF"/>
            <UlComponent link="/youtube" image = {imageYoutube} Name = "Youtube"/>
            
            
          </ul>
      </div>
        );
    }
}

export default Header;

function UlComponent (props){
    
    return (
        <li>
            {/* <a href={props.link} target="_blank" rel="noopener">
              <img src={props.image} alt="" />
              {props.Name}
              {props.icon}
            </a> */}
            <NavLink to={props.link}  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                <div style={{display:'flex',width:'100%'}}>
                <img src={props.image} alt="" />
                <div className='text_menuSide'>{props.Name}
                {props.icon}</div>
                
                </div>
                
              </NavLink>
          </li>
    )
}