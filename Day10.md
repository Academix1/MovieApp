
### ` src/components/GenreDrawer.js(Type Simulator)`

```javascript
 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
//[pause]
import { clearSelectedGenre, fetchGenres, setSelectedGenre } from '../redux/movieSlice';
//[pause]
const DRAWER_WIDTH = 240;
//[pause]
function GenreDrawer() {
//[pause]
  const dispatch = useDispatch();
//[pause]
  const theme = useTheme();
//[pause]
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//[pause]
  const genres = useSelector((state) => state.movies.genres);
//[pause]
  const selectedGenre = useSelector((state) => state.movies.selectedGenre);
//[pause]
  useEffect(() => {
//[pause]
    dispatch(fetchGenres());
//[pause]
  }, [dispatch]);
//[pause]
  const handleGenreClick = (genre) => {
//[pause]
    if (selectedGenre?.id === genre.id) {
//[pause]
      dispatch(clearSelectedGenre());
//[pause]
    } else {
      dispatch(setSelectedGenre(genre)); 
    }
  };
//[pause]  

  const drawer = (
    <>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          Genres
        </Typography>
      </Box>
//[pause]
      <List>
        {genres.map((genre) => (
//[pause]
          <ListItem key={genre.id} disablePadding>
//[pause]
            <ListItemButton
              selected={selectedGenre?.id === genre.id}
              onClick={() => handleGenreClick(genre)}
            >
//[pause]
              <ListItemText primary={genre.name} />
//[pause]
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
//[pause]

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={false} // This will be controlled by a state in the parent component
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              position: 'relative',
              height: '100vh',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
}

export default GenreDrawer;

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
//[pause]
  export const fetchGenres = createAsyncThunk(
    'movies/fetchGenres',
//[pause]
    async () => {
      const response = await api.get('/genre/movie/list');
//[pause]
      return response.data.genres;
    }
  );
  //[pause]
  export const fetchMoviesByGenre = createAsyncThunk(
    'movies/fetchMoviesByGenre',
//[pause]
    async (genreId) => {
//[pause]
      const response = await api.get(`/discover/movie?with_genres=${genreId}`);
//[pause]
      return response.data.results;
    }
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
    watchlist: [],
    searchResults: [],
    loading: false,
//[pause]
    genres: [],
//[pause]
    selectedGenre: null,
//[pause]
    genreMovies: [],
//[pause]
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
//[pause]
      setSelectedGenre: (state, action) => {
        state.selectedGenre = action.payload;
      },
//[pause]
      clearSelectedGenre: (state) => {
        state.selectedGenre = null;
        state.genreMovies = [];
      },
  },
//[pause]

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
      })
//[pause]
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
//[pause]
      .addCase(fetchGenres.rejected, (state, action) => {
        state.error = action.error.message;
      })
//[pause]
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.genreMovies = action.payload;
      })
//[pause]
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const {
    addToWatchlist,
    setSelectedGenre,
    clearSelectedGenre,
    removeFromWatchlist,
  } = movieSlice.actions;
  
export default movieSlice.reducer;
```


### ` src/App.js(main) `
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import Navbar from './components/NavBar';
import { store } from './redux/store';
//[pause]
import GenreDrawer from './components/GenreDrawer';
import Home from './pages/Home';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
//[pause]
          <Box sx={{ display: 'flex', mt: 8 }}>
          {/* Sidebar */}
//[pause]
          <Box
            component="aside"
//[pause]
            sx={{
              width: { xs: '100%', sm: '240px' }, // Full width on small screens, fixed on larger
              flexShrink: 0,
              position: 'fixed',
              height: 'calc(100vh - 64px)', // Subtract Navbar height
              overflowY: 'auto',
              scrollbarColor: 'rgba(23, 22, 22, 0.2) rgb(16, 15, 15)',
              overflowX:'hidden',
              borderRight: '1px solid #e0e0e0',
              bgcolor: 'background.paper',
            }}
          >
//[pause]
            <GenreDrawer />
//[pause]
          </Box>
//[pause]
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              ml: { sm: '240px' }, // Leave space for the sidebar on larger screens
              p: 3,
            }}
          >
//[pause]
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
//[pause]
          </Box>
        </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

 
### ` src/pages/Home.js(main) `

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchPopularMovies, fetchTrendingMovies,fetchMoviesByGenre } from '../redux/movieSlice';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';

function Home() {
    const dispatch = useDispatch();
//[pause]
    const {
      popular,
      trending,
      genreMovies,
      selectedGenre,
      loading,
    } = useSelector((state) => state.movies);
//[pause]
    useEffect(() => {
//[pause]
      if (selectedGenre) {
        dispatch(fetchMoviesByGenre(selectedGenre.id));
      }
//[pause]
 else {
        dispatch(fetchPopularMovies());
        dispatch(fetchTrendingMovies());
      }
    }, [dispatch, selectedGenre]);
//[pause]
  if (loading) {
    return <Loading message="Fetching movies..." />;
  }

//[pause]
  if (selectedGenre) {
//[pause]
    return (
      <Container sx={{ py: 4 }}>
//[pause]
        <Typography variant="h4" gutterBottom>
          {selectedGenre.name} Movies
        </Typography>
//[pause]
        <Grid container spacing={3}>
//[pause]
          {genreMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
//[pause]
        </Grid>
//[pause]
      </Container>
    );
  }
//[pause]
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {popular.slice(0, 6).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom>
        Trending Now
      </Typography>
      <Grid container spacing={3}>
        {trending.slice(0, 6).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
```
