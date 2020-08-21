import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchMovie from '../../service/tmbdApi';
import routes from '../routes';

export default class InlineMovieCast extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state = {cast: []}

componentDidMount() {
    fetchMovie
    .fetchMovieCast(this.props.match.params.movieId)
    .then(cast => this.setState({ cast }))
}


    render() {
        const {cast} = this.state;
        console.log('URL',this.props.match.path);
        return (
            <ul>
                {cast.map((actor) => <li key={actor.id}>
                <img
              src={`${routes.path}${actor.profile_path}`}
              alt={actor.name}
            />     
                <p>{actor.name}</p>
        <p>Character: {actor.character}</p>
              </li>)}
            </ul>
        )
    }
}
