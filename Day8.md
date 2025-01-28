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
