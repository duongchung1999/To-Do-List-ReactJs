import React, { Component } from 'react';
import './NavHeader.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
class NavHeader extends Component {
    state = {
        isDropdownOpen: false ,
        logout: false,
        // changePassword:false
    };
    

    toggleDropdown = () => {
        this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
    };
    toggleMenuSideVisibility = () => {
        this.props.toggleMenuSide();
    }
    loginFunction = () => {
        this.setState({
            logout:true
        });

    }
    LogoutFunction = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logout Success",
            showConfirmButton: false,
            timer: 1500
          });
        // const navigate = useNavigate(); 
        // this.props.history.push("/login");
        this.setState({
            logout:true
        });
    }

    render() {
        const { isDropdownOpen,logout } = this.state;
        var userName = localStorage.getItem("name");
        const item = JSON.parse(userName)
        
        return (
            
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
               {logout&&(<Navigate to="/login" replace={true}></Navigate>)}
               <div style={{display:'flex',flexDirection:'row'}}>
                <a className="navbar-brand header-logo" href="#!">
                    {/* <i class="fa-solid fa-tower-broadcast"></i> */}
                    <span className="ml-2 header-logo-span"><h1>學習</h1></span>
                    </a>
                    {/* Sidebar Toggle*/}
                    <BtnLink toggleMenuSideVisibility={this.toggleMenuSideVisibility} />
               </div>
                <ul className="navbar-nav  ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        onClick={this.toggleDropdown} // Gọi hàm toggleDropdown khi click
                        aria-expanded={isDropdownOpen ? "true" : "false"} // Đặt aria-expanded tương ứng với trạng thái của dropdown
                    >
                        {userName?item.value:null } <i className="fas fa-user fa-fw" />
                    </a>
                    <ul
                        className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu-end show' : ''}`} 
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                        <NavLink to="/changePassword" className="dropdown-item">
                            <i class="fa-solid fa-gears nav-icon"></i>
                            Đổi mật khẩu
                            </NavLink>
                        </li>
                        <li>
                        <a className="dropdown-item" onClick={this.loginFunction}>
                        
                        <i class="fa-solid fa-arrow-right-to-bracket nav-icon"></i>
                            Đăng nhập
                        </a>
                        </li>
                        <li>
                        <hr className="dropdown-divider" />
                        </li>
                        <li>
                        <a className="dropdown-item" onClick={this.LogoutFunction}>
                        <i class="fa-solid fa-arrow-right-from-bracket nav-icon"></i>
                        Đăng xuất {userName?" "+item.value:null } 
                            
                        </a>
                        </li>
                    </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavHeader;

const BtnLink = ({ toggleMenuSideVisibility }) => {
    return (
        <button
            className="btn btn-link btn-sm order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            onClick={toggleMenuSideVisibility} // Gọi hàm toggleMenuSideVisibility khi click
        >
            <i className="fas fa-bars" />
        </button>
    );
};