import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, searchMovies, getTrendingMovies } from '../utils/api';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await getPopularMovies();
    return response.data.results;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const response = await getTrendingMovies();
    return response.data.results;
  }
);

export const searchMoviesAsync = createAsyncThunk(
  'movies/search',
  async (query) => {
    const response = await searchMovies(query);
    return response.data.results;
  }
);

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.genres;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchByGenre',
  async (genreId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    trending: [],
    searchResults: [],
    watchlist: [],
    genres: [],
    selectedGenre: null,
    genreMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload.id);
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    clearSelectedGenre: (state) => {
      state.selectedGenre = null;
      state.genreMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreMovies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist, setSelectedGenre, clearSelectedGenre } = movieSlice.actions;
export default movieSlice.reducer;
