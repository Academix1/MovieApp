### `src/utils/api.ts (Vite(TS)) `

```javascript
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_ACCESS_KEY, // Use Vite environment variable
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch popular movies
export const getPopularMovies = () => api.get('/movie/popular');

// Function to fetch trending movies
export const getTrendingMovies = () => api.get('/trending/movie/day');

export default api;
```

### `src/redux/movieSlice.ts (VITE) `

```javascript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPopularMovies, getTrendingMovies } from '../utils/api'; // Ensure correct path to api.ts

// Define the initial state
interface MovieState {
  popularMovies: any[];
  trendingMovies: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  popularMovies: [],
  trendingMovies: [],
  loading: false,
  error: null,
};

// Define async actions using createAsyncThunk
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await getPopularMovies();
    return response.data.results;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const response = await getTrendingMovies();
    return response.data.results;
  }
);

// Create the slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch popular movies';
      })
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending movies';
      });
  },
});

export default movieSlice.reducer;
```


### `src/pages/Home.tsx (VITE)`

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice'; // Ensure the correct path
import { RootState, AppDispatch } from '../redux/store'; // Import AppDispatch type

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const { popularMovies, trendingMovies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies()); // Dispatch async action
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Popular Movies</h2>
      <div>
        {popularMovies.map((movie: any) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>

      <h2>Trending Movies</h2>
      <div>
        {trendingMovies.map((movie: any) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

```

---
