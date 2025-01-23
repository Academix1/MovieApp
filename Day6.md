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

---
