import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import fetchMovie from '../../service/tmbdApi';
import InlineMovieCast from '../InlineMovieCast/InlineMovieCast';
import routes from '../../routes';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, ButtonBase, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
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
});

class ShowDetails extends Component {
  state = { movie: null,
  cast: null };

  componentDidMount() {
    fetchMovie
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };
 
  render() {
    const {classes} = this.props;
    return (
<div className={classes.root}>
        {this.state.movie && (
          
<>
           <Button variant="outlined" 
                    color="primary" 
                    onClick={this.handleGoBack}>
            Go to back
           </Button>
           

    <div className={classes.root}>
      
        <Grid container spacing={2}>
          <Grid item>
           
              <img className={classes.img} alt="complex" 
              src={`${routes.path}${this.state.movie.poster_path}`}
              alt={this.state.movie.title}
               />
            
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                {this.state.movie.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                Overwiew
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {this.state.movie.overview}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" variant="subtitle1">
                Genres
                </Typography>
                <ul>
        {this.state.movie.genres.map((genres) => <li key={genres.id}>
                <p>{genres.name}</p>
              </li>)}
        </ul>
              </Grid>
              <Grid item>
                <Typography variant="body2" variant="subtitle1">
                Additional information
                <ul>
        <li>
        <Link to={`${this.props.match.url}/cast`}>Cast</Link>
        </li>
      
        </ul>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">User Score {this.state.movie.popularity}</Typography>
            </Grid>
          </Grid>
        </Grid>
     
     
    </div>
        
    <Route path={routes.cast} component={InlineMovieCast} />    
</>
    )}
</div>

    )
}
};
export default withStyles(styles)(ShowDetails);