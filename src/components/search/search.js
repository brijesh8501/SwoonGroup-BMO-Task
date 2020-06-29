import React, {Component} from 'react';
import  { connect } from 'react-redux';
import { fetchRestaurantsByUserInput, fetchCity } from '../../action/action';
import ShowData from '../../helper/showData';
import {toTitleCase} from '../../app.env.const';
import $ from "jquery";
import './search.css';

class Search extends Component{
    constructor(){
        super();
        
        this.state = {
            searchInput: '',
            searchInputPlaceholder: 'city',
            searchFilter: 'city',
            settings: {
                autoCompleteValue: '',
                autoCompleteListShow: false,
                autoCompleteValueSet: false, 
                autoCompleteListEmpty: false
            },
            autoCompleteList: [],
            city: [],
            resByAddress: [],
            searchResult: {},
            error: false,
            loading: false,
        }

    
    }
     // on change - HTML tags
    handleChange = (e) => {
            e.persist();
            this.setState(prevState => ({ 
                [e.target.name]: e.target.value,
                searchInputPlaceholder: `${(e.target.value === "zip")? 'postal code' : (e.target.name === "searchInput")? this.state.searchFilter : e.target.value}`
            }));    
            this.handleAutoCompleteInput(e);
    }
    // start autocomplete
    createAutoComplete = (searchFilter , searchInput) => {
        const list = searchFilter.filter((item)=>{
            if(searchInput && item.toLowerCase().startsWith(searchInput.toLowerCase())){
                return toTitleCase(item);
            }
            
        });
        return list;
    }
    // autocomplete input text
    handleAutoCompleteInput = (e) => {
        
        if(this.state.searchFilter === "city" && e.target.name === "searchInput"){
                const listData = this.createAutoComplete(this.state.city, e.target.value);
                const toShow = (listData.length===0) ? false:true;

                const checkSingleData = (listData.length === 1)? (listData[0] === toTitleCase(e.target.value)) ? 'empty' : 'full-list' : 'full-list';
                this.setState({
                    autoCompleteList: (checkSingleData === "empty") ? [] : listData,
                    settings: {
                        ...this.state.settings,
                        autoCompleteListShow: (checkSingleData === "empty") ? false : toShow,
                        autoCompleteListEmpty: (listData.length===0 && e.target.value)? true : false,
                        autoCompleteValue: (checkSingleData === "empty") ? e.target.value : this.state.autoCompleteValue,
                        autoCompleteValueSet: (checkSingleData === "empty") ? true : this.state.autoCompleteValueSet,
                    }
                })
        }
    }
    // autocomplete selected item from list
    handleAutoCompleteOptionClick = (e) => {
        e.preventDefault();
        this.setState({
            searchInput: e.currentTarget.innerHTML,
            autoCompleteList: [],
            settings: {
                ...this.state.settings,
                autoCompleteValue: e.currentTarget.innerHTML,
                autoCompleteListShow: false,
                autoCompleteValueSet: true
            }
        })
              
    }
    // search data - search button click
    handleSearch = (e) => {
        if(this.state.searchInput){
            const searchParameter = {
                searchInput: this.state.searchInput,
                searchFilter: this.state.searchFilter
            }
            this.setState({ loading: true, error: false});
            this.props.fetchRestaurantsByUserInput(searchParameter);
        }else{
            this.setState({ error: true });
            $('#searchInput').focus();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.searchFilter !== prevState.searchFilter){
            this.setState({ 
                searchInput:'', 
                autoCompleteList:[], 
                settings: {
                    autoCompleteValue: '',
                    autoCompleteListShow: false,
                    autoCompleteValueSet: false 
                },
                searchResult: []
            });
        }else  if(this.state.searchInput !== prevState.searchInput){
            this.setState({ 
                searchResult: []
            });
        }
    };
   
    componentWillReceiveProps = (nextProps) => {
        
        this.setState({
            city: (nextProps.city.cities.length !==0)? nextProps.city.cities : this.state.city,
        });
        if(nextProps.searchResult){
            this.setState({
                searchResult: nextProps.searchResult,
                loading: false
            });
        }
    }
    componentDidMount(){
        this.props.fetchCity();
    }
    loadResult = () =>{
        let length = Object.entries(this.state.searchResult).length === 0;
        if(!length){
            return (this.state.searchResult.restaurants.length===0)? (<div className="message margin-tp-5 text-center">No record found!</div>) : (<ShowData data={this.state.searchResult.restaurants}/>)
        }

    }
    render(){
        const {settings, autoCompleteList} = this.state;
        return(
            <div>
                <div className="search-wrapper">
                    <div className="search-box" id="searchBox">
                        <input 
                            type="text" 
                            className={`form-control ${(this.state.error)? 'is-invalid':'' }`} 
                            name="searchInput" id="searchInput" 
                            placeholder={`Search restaurants by ${this.state.searchInputPlaceholder}`}
                            onChange={this.handleChange}
                            value={this.state.searchInput} 
                            aria-label={(this.state.error)? `please give input first to search restaurants by ${this.state.searchFilter}`: `Search restaurants by  ${this.state.searchInputPlaceholder}` }
                          
                        />
                        <div className="search-list margin-tp-2">
                            <span className={`error ${(settings.autoCompleteListEmpty)? 'd-inline-block':'d-none'}`}>No record found!</span>
                            <ul className={`scrollbar ${(settings.autoCompleteListShow)? 'd-block':'d-none'}` } aria-label="input search list"   aria-hidden={(settings.autoCompleteListShow)? 'false':'true'}>
                            {autoCompleteList.map((item, i)=>{
                                    return(<li key={i} tabIndex="0" aria-label={item} onKeyPress={this.handleAutoCompleteOptionClick} onClick={this.handleAutoCompleteOptionClick}>{item}</li>)
                            })}
                            </ul>
                        </div>
                    </div>
                        <div className="filter-parameter">
                        <fieldset>
                        <legend>Filter</legend>
                        <div className="filter-box" >
                            <label className="wcag-hidden" id="sr-only" aria-label="selection items - city name address postal code"></label>
                            <div className="filter margin-rght-2 margin-bttm-2">
                                <input 
                                    type="radio" 
                                    id="city"
                                    name="searchFilter" 
                                    onChange = {this.handleChange}
                                    data-type = "searchFilter"
                                    value = "city"
                                    checked = {this.state.searchFilter === "city" ? true : false}
                                />
                                <label 
                                    htmlFor="city"
                                >
                                    City
                                </label>
                            </div>
                            <div className="filter margin-rght-2 margin-bttm-2">
                                <input 
                                    type="radio" 
                                    id="name"
                                    name="searchFilter" 
                                    onChange = {this.handleChange}
                                    data-type = "searchFilter"
                                    value="name"
                                    checked = {this.state.searchFilter === "name" ? true : false}
                                />
                                <label 
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="filter margin-rght-2 margin-bttm-2">
                                <input 
                                    type="radio" 
                                    id="address"
                                    name="searchFilter" 
                                    onChange = {this.handleChange}
                                    data-type = "searchFilter"
                                    value="address"
                                    checked = {this.state.searchFilter === "address" ? true : false}
                                />
                                <label 
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                            </div>
                            <div className="filter margin-bttm-2">
                                <input 
                                    type="radio" 
                                    id="postalCode"
                                    name="searchFilter" 
                                    onChange = {this.handleChange}
                                    data-type = "searchFilter"
                                    value="zip"
                                    checked = {this.state.searchFilter === "zip" ? true : false}
                                />
                                <label 
                                    htmlFor="postalCode"
                                >
                                    Postal code
                                </label>
                            </div>
                            </div>
                        </fieldset>
                    </div>
                    { (!this.state.loading)&&
                        <div className="button-wrapper">
                            <button type="button" name="Search" aria-label="search button" value="Search" onClick={this.handleSearch}>Search</button>
                        </div>
                    }     
                </div>             
                {(this.state.loading)&&
                   <div className="loader"><span>Loading...</span></div>
                }
                { this.loadResult()}
            </div>
        )
    }
}
function mapStateToProps(state, props){
    
    return{
        searchResult: state.searchRestaurants.searchResults,
        city: state.searchRestaurants.city
    }
}
export default connect(mapStateToProps, { fetchRestaurantsByUserInput, fetchCity })(Search);