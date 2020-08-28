import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

import fetchMovie from '../../service/tmbdApi';
import routes from '../../routes';

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
  static propTypes = {
    prop: PropTypes,
  };
  state = { review: [] };

  componentDidMount() {
    fetchMovie
      .fetchMovieReview(this.props.match.params.movieId)
      .then(review => this.setState({ review }));
  }

  render() {
    const { classes } = this.props;
    const { review } = this.state;

    return (
      <List className={classes.root}>
        {review.slice(0, 5).map(view => (
          <ListItem key={view.id} alignItems="flex-start">
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {view.author}
                  </Typography>
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
    );
  }
}
export default withStyles(styles)(InlineMovieReview);
