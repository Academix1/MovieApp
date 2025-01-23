### `src/pages/Search.js (Type Simulator)`

```javascript
import React, { useEffect } from 'react';
//[pause]
import { useDispatch, useSelector } from 'react-redux';
//[pause]
import { useLocation } from 'react-router-dom';
//[pause]
import { Container, Typography, Grid } from '@mui/material';
//[pause]
import { searchMoviesAsync } from '../redux/movieSlice';
//[pause]
import MovieCard from '../components/MovieCard';
//[pause]
import Loading from '../components/Loading';
//[pause]

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
//[pause]

function Search() {
//[pause]
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.movies);
//[pause]

useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);
//[pause]
  if (loading) {
    return <Loading message="Searching movies..." />;
  }
//[pause]
  return (
//[pause]
    <Container sx={{ py: 4 }}>
//[pause]
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
//[pause]
      <Grid container spacing={3}>
//[pause]
        {searchResults.map((movie) => (
//[pause]
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
//[pause]
        ))}
      </Grid>
    </Container>
  );
}
//[pause]
export default Search;
```

### `src/components/Navbar.js(Type Simulator)`
```js
import { useState } from 'react';
//[pause]
import { useNavigate } from 'react-router-dom';
//[pause]
import { Box, InputBase } from '@mui/material';
//[pause]
import { styled, alpha } from '@mui/material/styles';
//[pause]
import SearchIcon from '@mui/icons-material/Search';
//[pause]

const Search = styled('div')(({ theme }) => ({
//[pause]
  position: 'relative',
//[pause]
  borderRadius: theme.shape.borderRadius,
//[pause]
  backgroundColor: alpha(theme.palette.common.white, 0.15),
//[pause]
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
//[pause]
  marginLeft: theme.spacing(2),
//[pause]
  width: 'auto',
}));
//[pause]

const SearchIconWrapper = styled('div')(({ theme }) => ({
//[pause]
  padding: theme.spacing(0, 2),
//[pause]
height: '100%',
//[pause]
  position: 'absolute',
//[pause]
  pointerEvents: 'none',
//[pause]
  display: 'flex',
//[pause]
  alignItems: 'center',
//[pause]
  justifyContent: 'center',
}));
//[pause]

const StyledInputBase = styled(InputBase)(({ theme }) => ({
//[pause]
  color: 'inherit',
//[pause]
  '& .MuiInputBase-input': {
//[pause]
    padding: theme.spacing(1, 1, 1, 0),
//[pause]
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//[pause]
    transition: theme.transitions.create('width'),
//[pause]
    width: '12ch',
//[pause]
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
//[pause]
  },
}));
//[pause]
function SearchForm() {
//[pause]
  const [searchQuery, setSearchQuery] = useState('');
//[pause]
  const navigate = useNavigate();
//[pause]
  const handleSearch = (e) => {
//[pause]
    e.preventDefault();
//[pause]
    if (searchQuery.trim()) {
//[pause]
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//[pause]
      setSearchQuery('');
//[pause]
    }
  };
//[pause]
```

### `src/components/Navbar.js(Manual)`
```js


  return (
    <Box component="form" onSubmit={handleSearch} sx={{ ml: 'auto' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>
    </Box>
  );
}

export default SearchForm;

```




### `src/redux/movieSlice.js (Manual Code)`

```javascript
//[pause]
import api, { getPopularMovies, getTrendingMovies } from '../util/api';
//[pause]
export const searchMoviesAsync = createAsyncThunk(
//[pause]
  'movies/search',
  async (query) => {
//[pause]
    const response = await api.get(`/search/movie?query=${query}`);
//[pause]
    return response.data.results;
//[pause]
  }
//[pause]
);


const movieSlice = createSlice({
//[pause]
    searchResults: [],
//[pause]
  extraReducers: (builder) => {
//[pause]
    builder.addCase(searchMoviesAsync.fulfilled, (state, action) => {
//[pause]
      state.searchResults = action.payload;
//[quick]
    });
  },
});
//[pause]
export default movieSlice.reducer;
```


### `src/pages/App.js (Manual Code)`

```javascript

import Home from './pages/Home';
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<Router>
          <Navbar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </Router>

```

### `src/components/Navbar.js(main)`

```javascript
// Add a search form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          Movie App
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ ml: 'auto' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
```

### `src/pages/App.js(main)`
```javascript
  import React from 'react';
//[pause]
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//[pause]
  import { ThemeProvider, CssBaseline, Box } from '@mui/material';
//[pause]
  import { Provider } from 'react-redux';
//[pause]
  import theme from './styles/theme';
//[pause]
  import Navbar from './components/NavBar';
//[pause]
  import { store } from './redux/store';
//[pause]
  import Home from './pages/Home';
//[pause]
  import Search from './pages/Search';
//[pause]
  
  function App() {
    return (
//[pause]
      <Provider store={store}>
//[pause]
        <ThemeProvider theme={theme}>
//[pause]
          <CssBaseline />
//[pause]
          <Router>
//[pause]
            <Navbar />
//[pause]
            <Box sx={{ mt: 8 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </Box>
//[pause]
          </Router>
//[pause]
        </ThemeProvider>
      </Provider>
    );
  }
  //[pause]
  export default App;
```

### `src/redux/movieSlice.js (main)`

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
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    
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
export default movieSlice.reducer;
```


### `Installations`
```
npm install react-router-dom
```
