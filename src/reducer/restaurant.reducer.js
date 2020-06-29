import {SEARCH_RESTAURANTS, AUTOCOMPLETE_SEARCH, FETCH_CITY} from '../action/action';

export default function searchRestaurants(state = [], action = {}){

    switch(action.type){
       
        case SEARCH_RESTAURANTS:
            return {...state, searchResults:action.results};
        case AUTOCOMPLETE_SEARCH:
            return {...state, autocompleteSearchResults:action.results};
        case FETCH_CITY:
            return {...state, city:action.results};
        default: return state;
        
    }
}