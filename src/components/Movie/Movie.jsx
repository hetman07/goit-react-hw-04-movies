import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Rating, Alert } from '@material-ui/lab';
import getQueryParams from '../../utils/queryString';
import SearchMovie from './SearchMovie';
import fetchMovie from '../../service/tmbdApi';
import routes from '../../routes';
import imagePath from '../../assets/pusheen.jpg';

const styles = theme => ({
  rootAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

class Movie extends Component {
  static propTypes = {
    handleChangeQuery: PropTypes.func,
  };

  state = { movieQuery: [], isLoading: false, error: null };

  componentDidMount() {
    //в пропах записываем знаечение которое есть в location
    const { query } = getQueryParams(this.props.location.search);
    //если запрос есть то делаем феч по запросу
    if (query) {
      this.fetchMovies(query);
      //return;
    }
    //если запроса нет тогда делаем запрос по трендовым фильмам делаем другой запрос
    // this.fetchShows('batman')
  }

  //если поменялся запрос делаем новый запрос феч с Апишки
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = query => {
    this.setState({ isLoading: true });

    fetchMovie
      .fetchMovieQuery(query)
      .then(movies => {
        return this.setState({ movieQuery: movies });
      })
      .catch(error => {
        return this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleChangeQuery = query => {
    //Добавить запись в history
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { isLoading, movieQuery, error } = this.state;
    const { classes } = this.props;
    return (
      <>
        <SearchMovie onSubmit={this.handleChangeQuery} />
        {isLoading && <CircularProgress />}
        {movieQuery.length === 0 && this.props.location.search && !isLoading && (
          <div className={classes.rootAlert}>
            <Alert severity="info">
              There is <strong>no result</strong> for your request!
            </Alert>
          </div>
        )}
        {error && (
          <div className={classes.rootAlert}>
            <Alert severity="error">
              Cannot make request! <strong>Try again later!</strong>
            </Alert>
          </div>
        )}
        {movieQuery.length > 0 && (
          <>
            <GridList cellHeight={450} className={classes.gridList} cols={3}>
              {movieQuery.map(movie => (
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
                      pathname: `${this.props.match.url}/${movie.id}`,
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
      </>
    );
  }
}

export default withStyles(styles)(Movie);
