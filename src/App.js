import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCharactersWithRedux } from './redux.js';
import CharacterCard from './CharacterCard.js';

class App extends Component {
  componentDidMount(){
    this.props.fetchCharactersWithRedux()
  }
  render(){
    return (
        <ul>
        {
          this.props.posts && 
          this.props.posts.map((post) =>{
            return(
              <li>{post.title}</li>
            )
          })
        }
        </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts
  }
}


let Container = connect(mapStateToProps, {fetchCharactersWithRedux})(App);

export default App;
