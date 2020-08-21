import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import getQueryParams from '../../utils/queryString'

import SearchMovie from './SearchMovie'
import fetchMovie from '../../service/tmbdApi';

export default class Movie extends Component {
    static propTypes = {
        prop: PropTypes
    };

    state = {movieQuery: []};

    componentDidMount() {
        //в пропах записываем знаечение которое есть в location
        const { query } = getQueryParams(this.props.location.search);
 //если запрос есть то делаем феч по запросу
        if (query) {
          console.log('Есть квери, можно фечить');
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
    fetchMovie
    .fetchMovieQuery(query)
    .then(movies => {console.log('movieQuery', movies)
        return (this.setState({movieQuery: movies}))})
 }
 
 handleChangeQuery = query => {
    //Добавить запись в history
    this.props.history.push({
        ...this.props.location,
        search: `query=${query}`
    })
     }

    render() {
        return (
            <>
               <SearchMovie onSubmit={this.handleChangeQuery}/> 
            {this.state.movieQuery.length > 0 && (
                <>
                <h2>Movies with query</h2>
                <ul>
{this.state.movieQuery.map(movie => (
    <li key={movie.id}>
        <Link 
        to={{
            pathname:`${this.props.match.url}/${movie.id}`,
            state: {from: this.props.location},
            }}>
                {movie.title}
        </Link>
    </li>
))}
                </ul>
                </>
            )}
            </>
        )
    }
}
