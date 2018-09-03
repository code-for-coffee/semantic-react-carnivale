import { fetchCharactersRequest, fetchCharactersSuccess, fetchCharactersError } from './actions.js';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state, characters: action.payload.results};
    default:
      return state;
  }
} 

export function fetchCharactersWithRedux() {
	return (dispatch) => {
  	dispatch(fetchCharactersRequest());
    return fetchCharacters().then(([response, json]) =>{
    	if(response.status === 200){
      	dispatch(fetchCharactersSuccess(json))
      }
      else{
      	dispatch(fetchCharactersError())
      }
    })
  }
}

export function fetchCharacters() {
  const URL = "https://swapi.co/api/people/";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}