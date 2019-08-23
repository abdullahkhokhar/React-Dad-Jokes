import React, {Component} from 'react'
import axios from 'axios';
import './JokeList.css';

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
      <div className = "JokeList">
      <div className = "JokeList-sidebar">
        <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
        <button className='JokeList-getmore'>Fetch Jokes</button>
      </div>

        <div className = "JokeList-jokes">
          {this.state.jokes.map(j => (
            <div>{j}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
