- MovieSlice

```javascript
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../util/api'; // Ensure 'api' is correctly set up

// Thunk to fetch genres
export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async () => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  }
);

// Thunk to fetch movies by selected genre
export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchMoviesByGenre',
  async (genreId) => {
    const response = await api.get(`/discover/movie?with_genres=${genreId}`);
    return response.data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    genres: [],
    selectedGenre: null,
    genreMovies: [],
    error: null,
  },
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    clearSelectedGenre: (state) => {
      state.selectedGenre = null;
      state.genreMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Fetch Movies by Genre
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.genreMovies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSelectedGenre, clearSelectedGenre } = movieSlice.actions;

export default movieSlice.reducer;
```
- Genre-Drawer

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
import { fetchGenres, setSelectedGenre } from '../redux/MovieSlice';

const DRAWER_WIDTH = 240;

function GenreDrawer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const genres = useSelector((state) => state.movies.genres);
  const selectedGenre = useSelector((state) => state.movies.selectedGenre);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreClick = (genre) => {
      dispatch(setSelectedGenre(genre));
  };

  const drawer = (
    <>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          Genres
        </Typography>
      </Box>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton
              selected={selectedGenre?.id === genre.id}
              onClick={() => handleGenreClick(genre)}
            >
              <ListItemText primary={genre.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

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
- App.js
  
  ```javascript
      <Box sx={{ display: 'flex', mt: 8 }}>
            {/* Sidebar */}
            <Box
              component="aside"
              sx={{
                width: { xs: '100%', sm: '240px' }, // Full width on small screens, fixed on larger
                flexShrink: 0,
                position: 'fixed',
                height: 'calc(100vh - 64px)', // Subtract Navbar height
                overflowY: 'auto',
                borderRight: '1px solid #e0e0e0',
                bgcolor: 'background.paper',
              }}
            >
              <GenreDrawer />
            </Box>

            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                ml: { sm: '240px' }, // Leave space for the sidebar on larger screens
                p: 3,
              }}
            >
              <Routes>
              // Add Connection Pages
              </Routes>
            </Box>
          </Box>
    ```   
- Home.js

```javascript
    import { fetchPopularMovies, fetchTrendingMovies,fetchMoviesByGenre } from '../redux/movieSlice';
    const dispatch = useDispatch();
    const {
      popular,
      trending,
      genreMovies,
      selectedGenre,
      loading,
    } = useSelector((state) => state.movies);
  
    useEffect(() => {
      if (selectedGenre) {
        dispatch(fetchMoviesByGenre(selectedGenre.id));
      } else {
        dispatch(fetchPopularMovies());
        dispatch(fetchTrendingMovies());
      }
    }, [dispatch, selectedGenre]);

  if (loading) {
    return <Loading message="Fetching movies..." />;
  }
  if (selectedGenre) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedGenre.name} Movies
        </Typography>
        <Grid container spacing={3}>
          {genreMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

```
