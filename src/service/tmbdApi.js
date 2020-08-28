import axios from 'axios';
const http = 'https://api.themoviedb.org/3/';
const keyApi = '6dd15d0af49ada6394e6fa031610b6f8';

const fetchMovieTrending = () => {
  return fetch(`${http}trending/movie/day?api_key=${keyApi}`).then(response =>
    response.json(),
  );
};

const fetchMovieQuery = query => {
  return axios
    .get(
      `${http}search/movie?api_key=${keyApi}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(response => response.data.results);
};

const fetchMovieDetails = movieId => {
  return axios
    .get(`${http}movie/${movieId}?api_key=${keyApi}&language=en-US`)
    .then(response => response.data);
};

const fetchMovieCast = movieId => {
  return axios
    .get(`${http}movie/${movieId}/credits?api_key=${keyApi}`)
    .then(response => response.data.cast);
};

const fetchMovieReview = movieId => {
  return axios
    .get(
      `${http}movie/${movieId}/reviews?api_key=${keyApi}&language=en-US&page=1`,
    )
    .then(response => response.data.results);
};

export default {
  fetchMovieTrending,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieQuery,
  fetchMovieReview,
};
