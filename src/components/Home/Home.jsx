import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import fetchMovie from '../../service/tmbdApi';

export default class Home extends Component {
    static propTypes = {
        prop: PropTypes
    }

state = {movies: [],
isLoading: false,
error: false}

componentDidMount() {
    this.setState({isLoading: true});
    fetchMovie.fetchMovieTrending()
    .then(results => {
        console.log(results);
         return (this.setState({movies: [...results]}))})
    .catch(error => this.setState({error}))
    .finally(() => this.setState({isLoading: false}))
console.log(this.state.movies)
}
    render() {
        const {movies, isLoading} = this.state
        return (
            <>
           { movies.length>0 && (
               <>
               <h2>Trending Today</h2>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${this.props.match.url}movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
          </>
        )}
           </>
        )
    }
}
