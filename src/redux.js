import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

export function fetchCharactersRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

export function fetchCharactersSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

export function fetchCharactersError() {
  return {
    type: "FETCH_ERROR"
  }
}

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state, posts: action.payload};
    default:
      return state;
  }
} 

export function fetchCharactersWithRedux() {
  return (dispatch) => {
    dispatch(fetchCharactersRequest());
    return fetchPosts().then(([response, json]) =>{
      if(response.status === 200){
        dispatch(fetchCharactersSuccess(json))
      }
      else{
        dispatch(fetchCharactersError())
      }
    })
  }
}

export function fetchPosts() {
  const URL = "https://swapi.co/api/people/";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}