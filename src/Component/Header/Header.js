import React, { Component } from 'react';
import imageHome from '../../assets/image/Home.png';
import imageBook1 from '../../assets/image/book1.png';
import imageHanziDic from '../../assets/image/ic_logo.png';
import imageConvert from '../../assets/image/convert.jpg';
import imagePdf from '../../assets/image/pdf1.png';
import imageStickyNote from '../../assets/image/book2.jpg';


class Header extends Component {
    render() {
        return (
        <div className={this.props.isMenuOnClick?"header js-header":"hidden"}>
          <ul id="nav">
            <UlComponent link="#" image = {imageHome} Name = "Home"/>
            <UlComponent link="https://book.bfnn.org/books/0486.htm" image = {imageBook1} Name = "教程"/>
            <UlComponent link="https://nhidonghocphat.com/tinh-khong-phap-su-gia-ngon-luc-ds" 
            image = "https://ava-grp-talk.zadn.vn/2/b/e/8/2/360/056059ce9cbe0aa7b902032495aef1c6.jpg" 
            Name = "Website"/>
            <UlComponent link="https://hanzii.net/?hl=vi" image = {imageHanziDic} Name = "Hanzi Dict"/>
            <UlComponent link="https://tudiendich.com/" image = {imageConvert} Name = "Convert"/>
            <UlComponent link="https://tv.nhidonghocphat.com/gttd/CH21-010-03.pdf" image = {imagePdf} Name = "PDF"/>
            <UlComponent link="/stickyNote" image = {imageStickyNote} Name = "Sticky Note"/>
            
          </ul>
      </div>
        );
    }
}

export default Header;

function UlComponent (props){
    
    return (
        <li>
            <a href={props.link} target="_blank" rel="noopener">
              <img src={props.image} alt="" />
              {props.Name}
              {props.icon}
            </a>
          </li>
    )
}