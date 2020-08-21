import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './routes';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Movie from './Movie/Movie';
import MovieDetails from './MovieDetails/MovieDetails';

function App() {
  return (
    <>
      <Navigation />
      <hr />
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.movies} exact component={Movie} />
        <Route path={routes.movieDetails} component={MovieDetails} />
      </Switch>
    </>
  );
}

export default App;
