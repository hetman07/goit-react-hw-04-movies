import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import fetchMovie from '../../service/tmbdApi';
import routes from '../../routes';
import imagePath from '../../assets/pusheen.jpg';

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

class InlineMovieCast extends Component {
  state = { cast: [], error: null, isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovie
      .fetchMovieCast(this.props.match.params.movieId)
      .then(cast => this.setState({ cast }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { cast, error, isLoading } = this.state;

    return (
      <>
        {error && (
          <div className={classes.rootAlert}>
            <Alert severity="error"> {error} </Alert>
          </div>
        )}
        {isLoading && <CircularProgress />}
        <List className={classes.root}>
          {cast.slice(0, 5).map(actor => (
            <ListItem key={actor.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={
                    actor.profile_path
                      ? routes.path + actor.profile_path
                      : imagePath
                  }
                  alt={actor.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={actor.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Character:
                    </Typography>
                    {actor.character}
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
export default withStyles(styles)(InlineMovieCast);
