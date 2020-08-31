import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import routes from '../routes';
import Layout from './Layout';

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Layout>
        <Switch>
          <Route
            path={routes.home}
            exact
            component={lazy(() => import('./Home'))}
          />
          <Route
            path={routes.movies}
            exact
            component={lazy(() => import('./Movie'))}
          />
          <Route
            path={routes.movieDetails}
            component={lazy(() => import('./MovieDetails'))}
          />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
