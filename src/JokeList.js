import React, {Component} from 'react'
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4'
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    // number of times we get new jokes
    numJokesToGet: 10
  };

  constructor(props){
    super(props);
    this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")};
  }

  // the best place to make a request is in componentDidMount
  // LOGIC --> if there are jokes in local storage use then, otherwise fetch 10 new jokes
  componentDidMount(){
    if(this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes(){
    let jokes = [];
    while(jokes.length < this.props.numJokesToGet){
      // load new jokes with a request
      // with the reqest, we wnat JSON not the default html (how the API is setup)
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json"}
      });
      // push in an an object to the array, each object has a joke and a vote
      jokes.push({id: uuid(), text: res.data.joke, votes: 0});
    }
    this.setState({jokes: jokes}); // overwrite the old state

    // now we also want to update our window object with the current Jokes
    window.localStorage.setItem(
      "jokes",
      JSON.stringify(jokes)
    )
  }

  handleVote(id, delta){
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? {...j, votes: j.votes + delta} : j)
      })
    )
  }

  render(){
    return(
      <div className = "JokeList">
      <div className = "JokeList-sidebar">
        <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
        <button className='JokeList-getmore'>Fetch Jokes</button>
      </div>

        <div className = "JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke
              key={j.id}
              votes={j.votes}
              text={j.text}
              upvote = {() => this.handleVote(j.id, 1)}
              downvote = {() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
