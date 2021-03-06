import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch } from 'react-router-dom';
import fetchMovie from '../../service/tmbdApi';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import routes from '../../routes';
import imagePath from '../../assets/pusheen.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  rootAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  activeButton: {
    color: 'secondary',
  },
});

class ShowDetails extends Component {
  static propTypes = {
    handleGoBack: PropTypes.func,
  };

  state = { movie: null, cast: null, error: null, isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovie
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };

  render() {
    const { movie, error, isLoading } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {error && (
          <div className={classes.rootAlert}>
            <Alert severity="error"> {error} </Alert>
          </div>
        )}
        {isLoading && <CircularProgress />}
        {!movie && !isLoading && (
          <div className={classes.rootAlert}>
            <Alert severity="info"> No details about films! </Alert>
          </div>
        )}
        {movie && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleGoBack}
            >
              Go to back
            </Button>

            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item>
                  <img
                    className={classes.img}
                    src={
                      movie.poster_path
                        ? routes.path + movie.poster_path
                        : imagePath
                    }
                    alt={movie.title}
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Overview
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {movie.overview}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.title}>
                        Genres
                      </Typography>

                      <List>
                        {movie.genres.map(genres => (
                          <ListItem key={genres.id}>
                            <ListItemText primary={genres.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid item>
                      <Typography variant="body2" gutterBottom>
                        Additional information
                      </Typography>
                      <Typography variant="body2" variant="subtitle1">
                        <NavLink
                          exact
                          to={{
                            pathname: `${this.props.match.url}/cast`,
                            state: { from: this.props.location },
                          }}
                          className="Navigation-link"
                          activeClassName="Navigation-link-active"
                        >
                          <Button variant="outlined" color="primary">
                            Cast
                          </Button>
                        </NavLink>
                        <NavLink
                          exact
                          to={{
                            pathname: `${this.props.match.url}/reviews`,
                            state: { from: this.props.location },
                          }}
                          className="Navigation-link"
                          activeClassName="Navigation-link-active"
                        >
                          <Button variant="outlined" color="primary">
                            Reviews
                          </Button>
                        </NavLink>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1">
                      User Score {movie.popularity}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Suspense fallback={<CircularProgress />}>
                <Switch>
                  <Route
                    path={routes.cast}
                    component={lazy(() =>
                      import('../InlineMovieCast/InlineMovieCast'),
                    )}
                  />
                  <Route
                    path={routes.review}
                    component={lazy(() =>
                      import('../InlineMovieReview/InlineMovieReview'),
                    )}
                  />
                </Switch>
              </Suspense>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(ShowDetails);
