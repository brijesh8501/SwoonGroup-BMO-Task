import React, {Component} from 'react';
import './card.css';

class Card extends Component{
    render(){
        return(
            <div className="card padding-3" tabIndex="0" id={`card-${this.props.index+1}`}>
                <div className="card-body">
                    <h3 className="card-title">{this.props.data.name}</h3>
                    {/* <h4 className="card-subtitle mb-2 text-muted">ggg</h4> */}
                    <p className="card-text"><strong>Address:</strong> {`${this.props.data.address}, ${this.props.data.city}, ${this.props.data.state}, ${this.props.data.country} - ${this.props.data.postal_code} #Area: ${this.props.data.area}`}</p>
                  <p><strong>Phone:</strong> {this.props.data.phone}</p>
                </div>
            </div>
        )
    }
}
export default Card;