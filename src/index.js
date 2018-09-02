import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import CharacterCard from './CharacterCard.js';
import 'semantic-ui-css/semantic.min.css';
import ReduxThunk from 'redux-thunk';
import uuidv1 from 'uuid/v1';

function fetchCharactersRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

function fetchCharactersSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

function fetchCharactersError() {
  return {
    type: "FETCH_ERROR"
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state, characters: action.payload.results};
    default:
      return state;
  }
} 

function fetchCharactersWithRedux() {
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

function fetchCharacters() {
  const URL = "https://swapi.co/api/people/";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      characters: []
    }
  }
	componentDidMount(){
  	this.props.fetchCharactersWithRedux()
  }
	render(){
    const { characters } = this.props;
    let Cards;
    if (characters) Cards = characters.map((char) => {
      return <CharacterCard id={uuidv1()} props={char} />
    });
    console.log(Cards);
	  return (
    		<ul>
				{Cards}
        </ul>
    )
  }
}

function mapStateToProps(state){
	console.log(state);
	return {
  	characters: state.characters
  }
}

let Container = connect(mapStateToProps, {fetchCharactersWithRedux})(App);

const store = createStore(
    reducer,
    applyMiddleware(ReduxThunk)
);
ReactDOM.render(
    <Provider store={store}>
        <Container/>
    </Provider>,
    document.getElementById('root')
);
