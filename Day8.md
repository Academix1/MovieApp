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

```javascript
//[pause]
import React, { useState } from 'react';
//[pause]
import { useNavigate } from 'react-router-dom';
//[pause]
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';
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
//[pause]
}));
//[pause]

const StyledInputBase = styled(InputBase)(({ theme }) => ({
//[pause]
  color: 'inherit',
//[pause]
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
//[pause]
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
//[pause]
  },
}));
//[pause]
function Navbar() {
//[pause]
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
//[pause]
  const handleSearch = (e) => {
//[pause]
 e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
//[pause]

  return (
//[pause]
 <AppBar position="fixed">
//[pause]
      <Toolbar>
//[pause]
        <Typography variant="h6" component="div">
          Movie App
        </Typography>
//[pause]
        <Box component="form" onSubmit={handleSearch} sx={{ ml: 'auto' }}>
//[pause]
          <Search>
//[pause]
            <SearchIconWrapper>
//[pause]
              <SearchIcon />
//[pause]
            </SearchIconWrapper>
//[pause]
            <StyledInputBase
//[pause]
              placeholder="Search..."
//[pause]
              inputProps={{ 'aria-label': 'search' }}
//[pause]
              value={searchQuery}
//[pause]
              onChange={(e) => setSearchQuery(e.target.value)}
            />
//[pause]
          </Search>
        </Box>
//[pause]
      </Toolbar>
//[pause]
    </AppBar>
//[pause]
  );
}
//[pause]
export default Navbar;
```

### `src/redux/movieSlice.js (Type Simulator)`

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

//[pause]
export const searchMoviesAsync = createAsyncThunk(
//[pause]
    'movies/search',
//[pause]
    async (query) => {
      const response = await api.get(`/search/movie?query=${query}`);
      return response.data.results;
    }
//[pause]
  );
//[pause]

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
//[pause]
 searchResults: [],
//[pause]
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

    //[pause]
     builder.addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
    //[pause]
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      });
  },
});  
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





### `src/pages/App.js(main)`
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
import { Container, Typography, Grid } from '@mui/material';
import { searchMoviesAsync } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { AppDispatch } from '../redux/store';

// Define Movie type to structure the movie data
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}

// Define RootState to structure the state shape from Redux store
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
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch with AppDispatch
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);

  if (loading) {
    return <Loading message="Searching movies..." />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      <Grid container spacing={3}>
        {searchResults.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
```
### NavBar.ts(Vite)
```js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Styled components for the search bar
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

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
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
};

export default Navbar;
```



### `Installations`
```
npm install react-router-dom
```
