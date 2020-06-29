import React, {Component} from 'react';
import NavBar from './navBar/navBar';
import SideBar from './sideBar/sideBar';
import './header.css';
import Logo from '../../assets/react-logo.png';
import {MENU} from '../../app.env.const';
import {Link} from 'react-router-dom';

class Header extends Component{
   
    // opne side nav - mobile version
    openNav = () => {
        (window.innerWidth <= 450)?
        document.getElementById("mySidenav").style.width = "60vw"
            :
        document.getElementById("mySidenav").style.width = "250px";
    } 
    render(){
        return(
            <header className="header">
                <div className="container h-100">
                    <div className="header-content h-100">
                        <div className="logo-wrapper">
                            <Link
                                to="/"
                            >
                                <img src={Logo} className="img-fluid logo" alt="React logo" />
                            </Link>
                        </div>
                        <div className="sidebar-menu-wrapper d-none">
                            <span onClick={this.openNav} className="btn-sidebar sidebar-open d-md-none">&#9776; Menu</span>
                            <SideBar menuItems = {MENU}/>
                        </div>  
                    </div>
                </div>
                <NavBar/>
            </header>
        )
    }
}
export default Header;