### `src/utils/api.js (Type Simmulator) `

```javascript
import axios from 'axios';
//[pause]
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
//[pause]
headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
//[pause]
});
//[pause]
export const getPopularMovies = () => api.get('/movie/popular');
//[pause]
export const getTrendingMovies = () => api.get('/trending/movie/day');
//[pause]
export default api;
```
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

### `src/redux/movieSlice.js (Type Simmulator) `

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//[pause]
import { getPopularMovies, getTrendingMovies } from '../utils/api';
//[pause]
export const fetchPopularMovies = createAsyncThunk(
//[pause]
 'movies/fetchPopular',
//[pause]
async () => {
    const response = await getPopularMovies();
    return response.data.results;
  }
//[pause]
);
//[pause]
export const fetchTrendingMovies = createAsyncThunk(
//[pause]
'movies/fetchTrending',
//[pause]
async () => {
    const response = await getTrendingMovies();
    return response.data.results;
  }
);
//[pause]

const movieSlice = createSlice({
//[pause]
  name: 'movies',
//[pause]
initialState: {
    popular: [],
    trending: [],
    loading: false,
    error: null,
  },
//[pause]
  reducers: {},
//[pause]
  extraReducers: (builder) => {
//[pause]
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
//[pause]
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
//[pause]
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
//[pause]
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      });
  },
//[pause]
});
//[pause]
export default movieSlice.reducer;
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

### `src/pages/Home.js (Type Simmulator)`

```javascript
import React, { useEffect } from 'react';
//[pause]
import { useDispatch, useSelector } from 'react-redux';
//[pause]
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice';
//[pause]
function Home() {
//[pause]
 const dispatch = useDispatch();
//[pause]
const { popular, trending, loading } = useSelector((state) => state.movies);
//[pause]
  useEffect(() => {
//[pause]
    dispatch(fetchPopularMovies());
//[pause]
    dispatch(fetchTrendingMovies());
  }, [dispatch]);
//[pause]

  if (loading) {
    return <h2>Loading...</h2>;
  }
//[pause]

  return (
//[pause]
    <div style={{ padding: '20px' }}>
      <h2>Popular Movies</h2>
      <ul>
//[pause]
   {popular.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
//[pause]
      <h2>Trending Movies</h2>
//[pause]
  <ul>
        {trending.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
//[pause]
    </div>
  );
}
//[pause]
export default Home;
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
### Store

```ts
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
---
