import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fetchCharactersWithRedux, reducer } from './helpers/redux.js';
import CharacterCard from './components/CharacterCard.js';
import 'semantic-ui-css/semantic.min.css';
import ReduxThunk from 'redux-thunk';
import uuidv1 from 'uuid/v1';

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
