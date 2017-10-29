import "./style/style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
//ApolloClient doesn't care which client framework used.
import ApolloClient from 'apollo-client';

//Glue layer ApolloClient <-> react
import { ApolloProvider } from 'react-apollo';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

//{} -> default consumption, like'/graphql' is the root
const client = new ApolloClient({});

const Root = () => {
  return (
  	<ApolloProvider client={client}>
  		<BrowserRouter>
        <div className="container">
          <Switch>
            <Route path='/songs/new' component={SongCreate} />
            <Route path="/songs/:id" component={SongDetail} />
            <Route path='/' component={SongList} />
          </Switch>
        </div>
      </BrowserRouter>
  	</ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
