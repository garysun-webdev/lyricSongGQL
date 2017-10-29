import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props){
    super(props);
    this.state = {title: ''};
  }

  submitForm(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{query}]
    });

    this.props.history.push("/");
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <h3>Create New Song</h3>
          <label>Song Title:</label>
          <input 
            onChange={event => this.setState({title: event.target.value})}
            value = {this.state.title}
          />
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);