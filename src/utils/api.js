import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const getPopularMovies = () => api.get('/movie/popular');
export const getMovieDetails = (id) => api.get(`/movie/${id}`);
export const searchMovies = (query) => api.get(`/search/movie?query=${query}`);
export const getTrendingMovies = () => api.get('/trending/movie/day');
export const getMovieGenres = () => api.get('/genre/movie/list');

export default api;
