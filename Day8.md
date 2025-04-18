### `src/pages/App.tsx(main)`
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import Navbar from './components/NavBar';
import { store } from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

### Search.ts(VITE)
```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { searchMoviesAsync } from '../redux/MovieSlice';
import MovieCard from '../component/MovieCard';
import { AppDispatch } from '../redux/Store';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}

interface RootState {
  movies: {
    searchResults: Movie[];
    loading: boolean;
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      
      {/* Custom layout using Box */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="flex-start"
      >
        {searchResults.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              flex: '1 1 calc(25% - 24px)', 
              minWidth: '250px',
              maxWidth: '300px',
            }}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Search;
```
### NavBar.ts(Vite)
```js
import { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
          Movie App
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: 1,
              input: { color: 'black' } 
             }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: '#00bcd4', '&:hover': { backgroundColor: '#0097a7' } }}
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
```

### MovieSlice.tsx
```js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPopularMovies, getTrendingMovies } from '../utils/api';
import api from '../utils/api';

interface MovieState {
  popularMovies: any[];
  trendingMovies: any[];
  searchResults: any[];//[pause]Manages search results
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  popularMovies: [],
  trendingMovies: [],
  searchResults: [],//[pause]Initial empty state for search results
  loading: false,
  error: null,
};

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

export const searchMoviesAsync = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => {
    const response = await api.get(`/search/movie?query=${query}`);//[pause]API call for searching movies
    return response.data.results;//[pause]Returns search results
  }
);

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
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.searchResults = action.payload;//[pause]Updates state with search results
      });
  },
});

export default movieSlice.reducer;
```

### `Installations`
```
npm install react-router-dom
```
