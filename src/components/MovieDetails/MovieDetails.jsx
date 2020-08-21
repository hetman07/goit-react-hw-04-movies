import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import fetchMovie from '../../service/tmbdApi';
import InlineMovieCast from '../InlineMovieCast/InlineMovieCast';
import routes from '../routes';

export default class ShowDetails extends Component {
  state = { movie: null,
  cast: null };

  componentDidMount() {
    fetchMovie
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }));
  }

  render() {

    return (
      <div>
        {this.state.movie && (
          <>
            <img
              src={`${routes.path}${this.state.movie.poster_path}`}
              alt={this.state.movie.title}
            /> 
            <div>
            <h2>{this.state.movie.title}</h2>
        <p>User Score {this.state.movie.popularity}</p>
        <p>Overwiew</p>
        <p>{this.state.movie.overview}</p>
        <span>Genres</span>
        <ul>
        {this.state.movie.genres.map((genres) => <li key={genres.id}>
                <p>{genres.name}</p>
              </li>)}
        </ul>
        <p>Additional information</p>
        <ul>
        <li>
        <Link to={`${this.props.match.url}/cast`}>Cast</Link>
        </li>
      
        </ul>
            </div>         
          </>
        )}
        <Route path={routes.cast} component={InlineMovieCast} />
        {/* <Route path={`${this.props.match.path}/:this.props.match.params.movieId`} component={InlineShowDetails} /> */}
      </div>
    );
  }
}