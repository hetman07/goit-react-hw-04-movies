import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

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
  static propTypes = {
    prop: PropTypes,
  };
  state = { cast: [] };

  componentDidMount() {
    fetchMovie
      .fetchMovieCast(this.props.match.params.movieId)
      .then(cast => this.setState({ cast }));
  }

  render() {
    const { classes } = this.props;
    const { cast } = this.state;

    return (
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
              primary="Brunch this weekend?"
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {actor.name}
                  </Typography>
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
    );
  }
}
export default withStyles(styles)(InlineMovieCast);
