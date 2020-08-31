import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import fetchMovie from '../../service/tmbdApi';

const styles = theme => ({
  root: {
    width: '100%',
    //   maxWidth: '66ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class InlineMovieReview extends Component {
  state = { review: [], error: null, isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovie
      .fetchMovieReview(this.props.match.params.movieId)
      .then(review => this.setState({ review }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { review, error, isLoading } = this.state;

    return (
      <>
        {error && (
          <div className={classes.rootAlert}>
            <Alert severity="error"> {error} </Alert>
          </div>
        )}
        {isLoading && <CircularProgress />}
        {!isLoading && review.length === 0 && (
          <div className={classes.rootAlert}>
            <Alert severity="info">
              We don't have any reviews for this movie.
            </Alert>
          </div>
        )}
        <List className={classes.root}>
          {review.slice(0, 5).map(view => (
            <ListItem key={view.id} alignItems="flex-start">
              <ListItemText
                primary={view.author}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {view.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}
export default withStyles(styles)(InlineMovieReview);
