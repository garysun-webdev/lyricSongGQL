import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state={
      content:''
    }

  }

  addLyric(event){
    event.preventDefault();

    const {songId} = this.props;

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId
      }
    }).then(() => this.setState({content:''}));

  }

  render() {
    return(
      <form onSubmit={this.addLyric.bind(this)}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({content: event.target.value})}
        />
      </form>
    )
  }

}

const mutation = gql`
  mutation addLyric($content: String, $songId: ID ){
    addLyricToSong(content: $content, songId: $songId) {
      lyrics{
        content
      }
     }
  }
`;


export default graphql(mutation)(LyricCreate);