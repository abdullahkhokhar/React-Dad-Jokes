import React, {Component} from 'react'
import axios from 'axios';

class JokeList extends Component {
  static defaultProps = {
    // number of times we get new jokes
    numJokesToGet: 10
  };

  constructor(props){
    super(props);
    this.state = { jokes: [] };
  }

  // the best place to make a request is in componentDidMount
  async componentDidMount(){
    let jokes = [];
    while(jokes.length < this.props.numJokesToGet){
      // load new jokes with a request
      // with the reqest, we wnat JSON not the default html (how the API is setup)
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json"}
      });

      jokes.push(res.data.joke);
    }
    this.setState({jokes: jokes}); // overwrite the old state
  }

  render(){
    return(
      <div className = "jokeList">
        <h1>Dad Jokes</h1>
        <div className = "jokeList-jokes">
          {this.state.jokes.map(j => (
            <div>{j}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
