import React, {Component} from 'react';
import ShowData from '../../helper/showData';


class FetchData extends Component{
    render(){
        return( <ShowData data={this.props.data.restaurants}/> )
    }
}
export default FetchData;