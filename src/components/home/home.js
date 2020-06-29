import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';
import Search from '../search/search';
import './home.css';

class Home extends Component{
    body = () => {
        return (<div className="container container-body margin-tp-5 margin-bttm-5 h-100">
                <div className="map">
                </div>
                <Search/>
            </div>)
    }
    
    render(){
        return(
            <div>
                <Header/>
                {this.body()}
                <Footer/>
            </div>
        )
    }
}
export default Home;