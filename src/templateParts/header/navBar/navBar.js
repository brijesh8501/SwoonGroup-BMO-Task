import React, {Component} from 'react';
import './navBar.css';
import CreateMenu from '../createMenu';
import {MENU} from '../../../app.env.const';

class NavBar extends Component{
    render(){
        return(
           <div className="nav-bar">
                <div className="container h-100">
                    <div className="nav-menu h-100">   
                        <ul className="ul-menu">
                            { MENU.map((item, i) =>{
                                    return <CreateMenu key = {i} barType = "navBar" menuType = {item.menuType} menuTitle = {item.menuTitle} hrefLink = {item.hrefLink} additionalClass = {item.additionalClass}/>
                            }) }           
                        </ul>
                    </div>
                </div>          
           </div>
        )
    }
}
export default NavBar;