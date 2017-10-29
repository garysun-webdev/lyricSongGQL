import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: {id},
      refetchQueries: [{query}]
    })
    //another way to refetch:
    //.then(()=>this.prop.data.refetch());
  }

  showDetail(id) {
    this.props.history.push(`/songs/${id}`);
  }
  
  renderSongs(){
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <a className="waves-effect waves-light right">
          <i
            className="material-icons"
            onClick={()=>this.onSongDelete(id)}
          >delete</i>
          </a>
        </li>
      )
    });
  }

  render() {
    const {loading} = this.props.data;
    if(loading){
      return(
        <div>Loading...</div>
      )
    }
		return(
		  <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large waves-effect waves-light red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
		)
	}
}

const mutation = gql`
  mutation DeleteSong($id:ID){
    deleteSong(id:$id){
      id
    }
  }
`


//graphql(query) return a function -> with (SongList) the function called
//when this component get rendered into the screen,
//the query called
//->props
export default graphql(mutation)(
  graphql(query)(SongList)
);