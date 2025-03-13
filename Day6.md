### `src/utils/api.ts (Vite(TS)) `

```javascript
import axios from 'axios'; //[pause]

const api = axios.create({ //[pause]
  baseURL: 'https://api.themoviedb.org/3', //[pause]
  params: { //[pause]
    api_key: import.meta.env.VITE_TMDB_ACCESS_KEY, //[pause]
  }, //[pause]
  headers: { //[pause]
    'Content-Type': 'application/json', //[pause]
  }, //[pause]
}); //[pause]

export const getPopularMovies = () => api.get('/movie/popular'); //[pause]

export const getTrendingMovies = () => api.get('/trending/movie/day'); //[pause]

export default api; //[pause]
```

### `src/redux/movieSlice.ts (VITE) `

```javascript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; //[pause]
import { getPopularMovies, getTrendingMovies } from '../utils/api'; //[pause]

interface MovieState { //[pause]
  popularMovies: any[]; //[pause]
  trendingMovies: any[]; //[pause]
  loading: boolean; //[pause]
  error: string | null; //[pause]
} //[pause]

const initialState: MovieState = { //[pause]
  popularMovies: [], //[pause]
  trendingMovies: [], //[pause]
  loading: false, //[pause]
  error: null, //[pause]
}; //[pause]

export const fetchPopularMovies = createAsyncThunk( //[pause]
  'movies/fetchPopularMovies', //[pause]
  async () => { //[pause]
    const response = await getPopularMovies(); //[pause]
    return response.data.results; //[pause]
  } //[pause]
); //[pause]

export const fetchTrendingMovies = createAsyncThunk( //[pause]
  'movies/fetchTrendingMovies', //[pause]
  async () => { //[pause]
    const response = await getTrendingMovies(); //[pause]
    return response.data.results; //[pause]
  } //[pause]
); //[pause]

const movieSlice = createSlice({ //[pause]
  name: 'movies', //[pause]
  initialState, //[pause]
  reducers: {}, //[pause]
  extraReducers: (builder) => { //[pause]
    builder //[pause]
      .addCase(fetchPopularMovies.pending, (state) => { //[pause]
        state.loading = true; //[pause]
      }) //[pause]
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<any[]>) => { //[pause]
        state.loading = false; //[pause]
        state.popularMovies = action.payload; //[pause]
      }) //[pause]
      .addCase(fetchPopularMovies.rejected, (state, action) => { //[pause]
        state.loading = false; //[pause]
        state.error = action.error.message || 'Failed to fetch popular movies'; //[pause]
      }) //[pause]
      .addCase(fetchTrendingMovies.pending, (state) => { //[pause]
        state.loading = true; //[pause]
      }) //[pause]
      .addCase(fetchTrendingMovies.fulfilled, (state, action: PayloadAction<any[]>) => { //[pause]
        state.loading = false; //[pause]
        state.trendingMovies = action.payload; //[pause]
      }) //[pause]
      .addCase(fetchTrendingMovies.rejected, (state, action) => { //[pause]
        state.loading = false; //[pause]
        state.error = action.error.message || 'Failed to fetch trending movies'; //[pause]
      }); //[pause]
  }, //[pause]
}); //[pause]

export default movieSlice.reducer; //[pause]
```


### `src/pages/Home.tsx (VITE)`

```javascript
import React, { useEffect } from 'react'; //[pause]
import { useDispatch, useSelector } from 'react-redux'; //[pause]
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice'; //[pause]
import { RootState, AppDispatch } from '../redux/store'; //[pause]

const MovieList: React.FC = () => { //[pause]
  const dispatch = useDispatch<AppDispatch>(); //[pause]
  const { popularMovies, trendingMovies, loading, error } = useSelector( //[pause]
    (state: RootState) => state.movies //[pause]
  ); //[pause]

  useEffect(() => { //[pause]
    dispatch(fetchPopularMovies()); //[pause]
    dispatch(fetchTrendingMovies()); //[pause]
  }, [dispatch]); //[pause]

  if (loading) return <p>Loading...</p>; //[pause]
  if (error) return <p>{error}</p>; //[pause]

  return ( //[pause]
    <div> //[pause]
      <h2>Popular Movies</h2> //[pause]
      <div> //[pause]
        {popularMovies.map((movie: any) => ( //[pause]
          <div key={movie.id}>{movie.title}</div> //[pause]
        ))} //[pause]
      </div> //[pause]

      <h2>Trending Movies</h2> //[pause]
      <div> //[pause]
        {trendingMovies.map((movie: any) => ( //[pause]
          <div key={movie.id}>{movie.title}</div> //[pause]
        ))} //[pause]
      </div> //[pause]
    </div> //[pause]
  ); //[pause]
}; //[pause]

export default MovieList; //[pause]
```

---
