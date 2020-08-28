import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Rating, Alert } from '@material-ui/lab';

import fetchMovie from '../../service/tmbdApi';
import routes from '../../routes';
import imagePath from '../../assets/pusheen.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  rootAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  gridList: {
    width: 1100,
    // height: 1100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class Home extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  state = { movies: [], isLoading: false, error: null };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovie
      .fetchMovieTrending()
      .then(res => {
        if (res.results) {
          return this.setState({ movies: [...res.results] });
        } else if (res.status_code === 7 || res.status_code === 34) {
          return this.setState({ error: res.status_message });
        }
      })
      .catch(error => {
        console.warn('ERROR:', error);
      })

      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { classes } = this.props;

    const { movies, error, isLoading } = this.state;

    return (
      <div className={classes.root}>
        {error && (
          <div className={classes.rootAlert}>
            <Alert severity="error"> {error} </Alert>
          </div>
        )}
        {isLoading && <CircularProgress />}
        {movies.length === 0 && !isLoading && (
          <div className={classes.rootAlert}>
            <Alert severity="info"> No films </Alert>
          </div>
        )}
        {movies.length > 0 && (
          <>
            <GridList cellHeight={450} className={classes.gridList} cols={3}>
              <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <ListSubheader component="div">Trending Today</ListSubheader>
              </GridListTile>

              {movies.map(movie => (
                <GridListTile key={movie.id}>
                  <img
                    src={
                      movie.poster_path
                        ? routes.path + movie.poster_path
                        : imagePath
                    }
                    alt={movie.title}
                  />
                  <Link
                    to={{
                      pathname: `${this.props.match.url}movies/${movie.id}`,
                      state: { from: this.props.location },
                    }}
                  >
                    <GridListTileBar
                      title={movie.title}
                      subtitle={
                        <Rating
                          name="half-rating"
                          defaultValue={movie.vote_average}
                          precision={0.5}
                          max={10}
                          size={'small'}
                          readOnly
                        />
                      }
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${movie.title}`}
                          className={classes.icon}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </Link>
                </GridListTile>
              ))}
            </GridList>
          </>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(Home);
