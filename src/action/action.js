import axios from 'axios';
import {toTitleCase} from '../app.env.const';
export const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';
export const RESTAURANT_FETCHED = 'RESTAURANT_FETCHED';
export const FETCH_CITY = 'FETCH_CITY';
export const AUTOCOMPLETE_SEARCH = 'AUTOCOMPLETE_SEARCH';

export function city(results){
    return {
        type: FETCH_CITY,
        results
    }
}
export function searchRestaurants(results){
    return {
        type: SEARCH_RESTAURANTS,
        results
    }
}
export function autocompleteSearch(results){
    return{
        type: AUTOCOMPLETE_SEARCH,
        results
    }
}
export function fetchRestaurantsByUserInput(data){

    let searchParameter = '';
    if(data.searchFilter === "zip"){
        searchParameter = data.searchInput.toUpperCase()
    }else{
        searchParameter = toTitleCase(data.searchInput);
    }
    return dispatch => {
        axios.get(`http://opentable.herokuapp.com/api/restaurants?${data.searchFilter}=${searchParameter}`)
        .then(response => {
           
            dispatch(searchRestaurants(response.data));
        })
        .catch((err) => {
            console.log(err);
        });
    }
   
}
export function fetchCity(){

        return dispatch => {
            axios.get(`http://opentable.herokuapp.com/api/cities`)
            .then(response => {
                dispatch(city(response.data));
            })
            .catch((err) => {
                console.log(err);
            });
        }
}
