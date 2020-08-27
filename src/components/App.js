import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import routes from '../routes';
import Layout from './Layout/Layout';

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Layout>
        <Switch>
          <Route
            path={routes.home}
            exact
            component={lazy(() => import('./Home/Home'))}
          />
          <Route
            path={routes.movies}
            exact
            component={lazy(() => import('./Movie/Movie'))}
          />
          <Route
            path={routes.movieDetails}
            component={lazy(() => import('./MovieDetails/MovieDetails'))}
          />
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
