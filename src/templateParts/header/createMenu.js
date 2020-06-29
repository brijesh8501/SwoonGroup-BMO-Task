import React from 'react';
import {Link} from 'react-router-dom';

const CreateMenu = (props) =>{
    let template = null;
    
   // const checkUrl = window.location.pathname.replace(/#/, "");
    const checkActive = ((window.location.pathname===props.hrefLink) || (props.hrefLink !== "/" && window.location.pathname.includes(props.hrefLink))) ? 'active' : '';
    
    console.log(checkActive);
    switch(props.menuType)
    {
        case('single') :

            switch(props.barType)
            {
                case('navBar') :
                    template = (
                        <li className={`${props.additionalClass} ${checkActive}`}>
                            <Link 
                                className="nav-link" 
                                to={props.hrefLink}
                            >
                                {props.menuTitle}
                            </Link>
                        </li>
                    );
                    break;
                case('sideBar') :
                    template = (
                        <div className={`sidebar-item border-top border-bottom ${checkActive}`}>
                        <Link 
                            to={props.hrefLink}
                        >
                            {props.menuTitle}
                        </Link>
                        </div>
                    );
                    break;
                default :
                    template = null;
            }
            
            break;
        default :
            template = null;
    }
    return template
}
export default CreateMenu;