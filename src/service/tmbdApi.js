import axios from 'axios';

const http = 'https://api.themoviedb.org/3/';
const keyApi = '6dd15d0af49ada6394e6fa031610b6f8';

const fetchMovieTrending = () => {
  return axios
    .get(`${http}trending/movie/day?api_key=${keyApi}`)
    .then(response => response.data.results); //обязательно response.data
};
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

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

export default { fetchMovieTrending, fetchMovieDetails, fetchMovieCast };
