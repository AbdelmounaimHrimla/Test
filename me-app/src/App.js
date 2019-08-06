import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Blog from './containers/Blog/Blog';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri : 'http://localhost:8000/mygraphiql'
});

function App() {
  return (
  	<ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Blog />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
