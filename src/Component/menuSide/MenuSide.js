import React, { Component } from 'react';
import './MenuSide.css';
import { NavLink } from 'react-router-dom';


class MenuSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          viewMenuSide2nd: localStorage.getItem("viewItAsset")?localStorage.getItem("viewItAsset"):false,
        };
    }
    componentDidUpdate(prevState){
        if(prevState.viewMenuSide2nd != this.state.viewMenuSide2nd){
            this.renderItemAsset();
            localStorage.setItem('viewItAsset',this.state.viewMenuSide2nd)
        }
    }
    viewItem = () =>{
        this.setState(prevState =>({
            viewMenuSide2nd: !prevState.viewMenuSide2nd
            
        }));
    }
    renderItemAsset = () =>{
        if(this.state.viewMenuSide2nd){
            return(
                <div className='menuSide-2nd'>
                    <NavItem path="/convertText" itemName="Chuyển đổi text" icon = {<i class="nav-icon fa-solid fa-font"></i>}/>
                    <NavItem path="/tudiendich" itemName="Từ điển dịch" icon = {<i class="nav-icon fa-solid fa-shuffle"></i>}/>
                    <NavItem path="/pdfGiaotrinh" itemName="Giáo trình PDF" icon = {<i class="nav-icon fa-solid fa-file-pdf"></i>}/>
                </div>
            )
        }
        return null;
        
    }
    render() {
        const { isMenuSideVisible } = this.props;
        var userName = localStorage.getItem("name");
        const item = JSON.parse(userName)
        // console.log(userName);
        return (
            <div className={isMenuSideVisible ? 'layoutContainer d-none d-md-inline-block' : 'layoutContainer d-none d-md-inline-block'}>
            {/* <div className={isMenuSideVisible ? 'layoutContainer d-none d-md-inline-block' : 'layoutContainer d-none d-md-inline-block'}> */}
                <div className='menuSide sb-sidenav'>
                    <div className='menuSide-item'>
                        <ul className="menuSide-nav">
                            <NavItem path="/" itemName="Home" icon = {<i className="nav-icon fa-solid fa-house"></i>}/>
                            <NavItem path="/nhidonghocphat" itemName="Nhi đồng học Phật" icon = {<i className="nav-icon fa-solid fa-earth-americas"></i>}/>
                            <NavItem path="/hanzi" itemName="Từ điển Hanzi" icon = {<i className="nav-icon fa-solid fa-language"></i>}/>
                            <NavItem path="/youtube" itemName="Video" icon = {<i className="nav-icon fa-brands fa-youtube"></i>}/>
                            <NavItem path="/jiaocheng" itemName="TKPS Gia Ngôn Lục" icon = {<i class="nav-icon fa-solid fa-book-journal-whills"></i>}/>
                            
                            <li className='menuSide-it-asset' onClick={this.viewItem}>
                                <a className='nav-link'>
                                    <i class="nav-icon fa-solid fa-toolbox"></i>
                                    Cập nhật bài học
                                    {this.renderItemAsset()}
                                    
                                    
                                </a>
                            </li>
                            {/* <NavItem path="/history" itemName="History" icon = {<i className="nav-icon fa-solid fa-clock-rotate-left"></i>}/> */}
                            
                        </ul>
                        
                    </div>

                    <div className='menuSide-footer'>
                        <div className="small">Đăng nhập với</div>
                        <i className="fa-solid fa-diagram-project"></i>
                        <span className="ml-2">{userName?item.value:"Guest"}</span>
                    </div>

                    
                </div>
            </div>
            
        );
    }
}

function NavItem(props){
    return(
        <li>
            <NavLink to={props.path}  className ="nav-link">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}

function NavItem2nd(props){
    return(
        <li>
            <NavLink to={props.path}  className ="nav-link-2nd">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}
export default MenuSide;