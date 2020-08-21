import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import Movie from './Movie/Movie';
import MovieDetails from './MovieDetails/MovieDetails';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.movies} exact component={Movie} />
        <Route path={routes.movieDetails} component={MovieDetails} />
      </Switch>
    </Layout>
  );
}

export default App;
