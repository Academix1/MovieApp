
### ` src/redux/MovieSlice.js(updated) `
```javascript
import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    watchlist: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
} = movieSlice.actions;

export default movieSlice.reducer;

```
### ` src/redux/MovieSlice.js(main) `
```javascript
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, getTrendingMovies } from '../utils/api';
import api  from '../utils/api';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await getPopularMovies();
    return response.data.results;
  }
);
export const searchMoviesAsync = createAsyncThunk(
    'movies/search',
    async (query) => {
      const response = await api.get(`/search/movie?query=${query}`);
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

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    trending: [],
    watchlist: [],
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToWatchlist: (state, action) => {
        state.watchlist.push(action.payload);
      },
      removeFromWatchlist: (state, action) => {
        state.watchlist = state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        );
        
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
      builder.addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      });
  },
});
export const {
    addToWatchlist,
    removeFromWatchlist,
  } = movieSlice.actions;
  
export default movieSlice.reducer;
```    

- MovieCard
```javascript
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  
  const watchlist = useSelector((state) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

// Add on Code  
  return (
      <IconButton
        onClick={handleWatchlistClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: isInWatchlist ? 'primary.main' : 'text.secondary', // Change icon color based on watchlist status
        }}
      >
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
  );
}

export default MovieCard;

```
- WatchList
  ```javascript
  import React from 'react';
  import { useSelector } from 'react-redux';
  import { Container, Typography, Grid } from '@mui/material';
  import MovieCard from './MovieCard'; // Ensure the path to MovieCard is correct
  
  function Watchlist() {
    const watchlist = useSelector((state) => state.movies.watchlist);
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          My Watchlist
        </Typography>
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  
  export default Watchlist;
  ```

- NavBar
  
```javascript
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const handleWatchlistClick = () => {
    navigate('/watchlist');
  };

 <Button
          color="inherit"
          onClick={handleWatchlistClick}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Watchlist
        </Button>
```
- App.js

```javascript

    import Watchlist from './pages/Watchlist';
    <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
```
