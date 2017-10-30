import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  
  onLike(id, likes){
    this.props.mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes+1
        }
      }
    })
  }


  renderList(lyric){
    return(
      <li key={lyric.id} className="collection-item">{lyric.content}
        <div className='vote-box'>
           <i
              className="material-icons"
              onClick={()=>this.onLike(lyric.id, lyric.likes)}
           >
           thumb_up
           </i>
          {lyric.likes}
        </div>
      </li>
    )
  }


  render(){
    return(
      <ul className="collection">
        {this.props.lyrics.map(lyric=>this.renderList(lyric))}
      </ul>
    )
  }
}

const mutation = gql `
  mutation likeLyric($id:ID){
  likeLyric(id:$id){
    id
    likes
  }
}
`;

export default graphql(mutation)(LyricList);