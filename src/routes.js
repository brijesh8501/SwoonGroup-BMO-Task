import React, {Component} from 'react';
import Home from './components/home/home';
import {Route, Switch } from 'react-router-dom';

class Routes extends Component{
    render(){
        return (
                <Switch>
                    <Route path="/" exact component={Home}/>
                </Switch>
        )
    }
}
export default Routes;