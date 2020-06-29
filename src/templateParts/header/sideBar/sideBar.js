import React, {Component} from 'react';
import CreateMenu from '../createMenu';
import './sideBar.css';

class SideBar extends Component{
    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
    }
    render(){
        return(
            <div id="mySidenav" className="sidenav">
                <a className="closebtn" onClick={this.closeNav}>&times;</a>
                <div className="sidebar-menu">
                    <div className="side-1">
                    { this.props.menuItems.map((item, i) =>{
                        return <CreateMenu key = {i} barType = "sideBar" menuType = {item.menuType} menuTitle = {item.menuTitle} hrefLink = {item.hrefLink}/>
                    }) } 
                    </div>    
                    <div className="side-2 text-white">
                        <div className="w-100 h-100 side-2-content">
                           
                        </div>
                    </div>             
                </div>
            </div>
        )
    }
}
export default SideBar;