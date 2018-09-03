import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import ReduxThunk from 'redux-thunk';
import uuidv1 from 'uuid/v1';
import { Grid } from 'semantic-ui-react';

import { fetchCharactersWithRedux, reducer } from './helpers/redux.js';
import CharacterCard from './components/CharacterCard.js';
import AppHeader from './components/Header.js';
import { chunkArray } from './helpers/chunkArray.js';
import { colors } from './enums/colors.js';
import { getRandom } from './helpers/getRandom.js';

import './App.css';

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      characters: []
    }
  }
	componentDidMount(){
  	this.props.fetchCharactersWithRedux()
  }
  generateRows(cards) {
    let rows = [];
    if (cards) {
      let result = chunkArray(cards, 2);
      result.forEach((chunk) => {
        let CardA = chunk[0];
        let CardB = chunk[1];
        rows.push(
          <Grid.Row>
          <Grid.Column>
            <CardA id={uuidv1()} />
            <CardB id={uuidv1()} />
          </Grid.Column>
          </Grid.Row>
        )
      })
    }
    return rows;
  }
	render(){
    const { characters } = this.props;
    let Cards;
    let iterator = 0;
    if (characters) Cards = characters.map((char) => {
      return (
        <Grid.Column color={getRandom(colors)}>
          <CharacterCard id={uuidv1()} props={char} />
        </Grid.Column>
      )
    });
    console.log(Cards);
    let x = this.generateRows(Cards);
	  return (
      <Fragment>
        <AppHeader />
      <Grid columns={3} stackable>
        <Grid.Row>
          {Cards}
        </Grid.Row>
      </Grid>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
	console.log(state);
	return {
  	characters: state.characters
  }
}

let AppContainer = connect(mapStateToProps, 
  {fetchCharactersWithRedux})(App);

ReactDOM.render(
  <Provider store={store}>
      <AppContainer/>
  </Provider>,
  document.getElementById('root')
);
