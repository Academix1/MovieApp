# Movie App Integration with Redux and API

## Week 1: React Basics

### **Goal**: Master core React concepts and set up the foundational structure for the Movie App.

### **Day 1 (Monday): React Setup and Fundamentals**
- **Tasks**: 
  1. **Create React App** and set up project structure.
  2. **Create `NavBar` and `theme.js`** to establish global settings.
  3. **Test Out With `App.js`.

- NavBar.js
  
    ``` javascript
      import React from 'react';
    import { AppBar, Toolbar, Typography } from '@mui/material';
    
    
    function NavBar() {
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              
                Movie App
              
            </Typography>
            
              WatchList
            
          </Toolbar>
        </AppBar>
      );
    }
    
    export default NavBar;

  ```
- Theme.js

```javascript
        import { createTheme } from '@mui/material/styles';

    const theme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#e50914',
        },
        secondary: {
          main: '#ffffff',
        },
        background: {
          default: '#141414',
          paper: '#1f1f1f',
        },
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
        h1: {
          fontSize: '2.5rem',
          fontWeight: 600,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              textTransform: 'none',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
      },
    });
    
    export default theme;
```

- App.js

```javascript
  import React from 'react';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import theme from './styles/theme';
    import Navbar from './components/Navbar';
    
    function App() {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: '64px', // Adjust to match the height of the NavBar
              }}
            >
              <h1>Welcome to the Movie App</h1>
            </Box>
          </Box>
        </ThemeProvider>
      );
    }
    
    export default App;
```
---

### **Day 2 (Wednesday): State, Events, and API Integration**
- **Tasks**:
    1. **Fetch popular movies** using `useEffect` in `Home.js`.

``` javascript

       import React, { useEffect, useState } from 'react';
      import axios from 'axios';
      import { Container, Grid, Typography } from '@mui/material';
      import MovieCard from '../components/MovieCard';
      
      function Home() {
        const [movies, setMovies] = useState([]);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          const fetchMovies = async () => {
            try {
              const response = await axios.get(
                'https://api.themoviedb.org/3/movie/popular',
                {
                  params: {
                    api_key: 'YOUR_API_KEY', // Replace with your TMDB API key
                  },
                }
              );
              setMovies(response.data.results);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching movies:', error);
              setLoading(false);
            }
          };
      
          fetchMovies();
        }, []);
      
        if (loading) {
          return (
            <Typography variant="h5" align="center" sx={{ mt: 4 }}>
              Loading...
            </Typography>
          );
        }
      
        return (
          <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
              Popular Movies
            </Typography>
            <Grid container spacing={3}>
              {movies.map((movie) => (
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
  ---                                
  
  2. **Create `MovieCard.js`** to display movies.

     ```javascript
       import React from 'react';
      import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
      
      function MovieCard({ movie }) {
        return (
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}/10
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );
      }
      
      export default MovieCard;
      ```
    

3. App.js Include Home Page and Fetch Popular Movies
 
 - `App.js`
  
  ```javascript
      import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import theme from './styles/theme';
    
    // Import pages and components
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    
    function App() {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1, mt: '64px', p: 3 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      );
    }
    
    export default App;

  ```
    
---

### **Day 3 (Friday): Redux Setup and Basic Movie Data Management**
- **Tasks**:
  
  1. **Create `api.js`** to fetch popular movies.
     ```javascript
     import axios from 'axios';

      const api = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      
      export const getPopularMovies = () => api.get('/movie/popular');      
      export default api;
     ```

  2. Update `Home.js` to integrate `api.js` for Data Fetching

     ```javascript
         import React, { useEffect, useState } from 'react';
        import { Container, Grid, Typography } from '@mui/material';
        import MovieCard from '../components/MovieCard';
        import { FetchPopular } from '../api/api'; // Importing FetchPopular function
        
        function Home() {
          const [movies, setMovies] = useState([]);
          const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            const data = await FetchPopular(); // Call FetchPopular from api.js
            setMovies(data.results); // Assuming the API response has a 'results' key
            setLoading(false);
          } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
          }
        };
    
        fetchMovies();
      }, []);
    
      if (loading) {
        return (
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            Loading...
          </Typography>
        );
      }
    
      return (
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Popular Movies
          </Typography>
          <Grid container spacing={3}>
            {movies.map((movie) => (
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

## Week 2: Advanced React

### **Goal**: Implement advanced state management using Redux and Redux Toolkit.

### **Day 1 (Monday): Introduction to Redux**
- **Tasks**:
  
  1. **Set up Redux Store** and **reducers**.
     - Create actions to fetch Trending Now movies and store them in the Redux store.
     - Implement reducers to manage state like `movies`, `loading`, `error`.

       - Store.js

       ```javascript
         import { configureStore } from '@reduxjs/toolkit';
        import movieReducer from './movieSlice';
        
        export const store = configureStore({
          reducer: {
            movies: movieReducer,
          },
        });
        
        export default store;
      ```
    - Reducers.js
       ```javascript
           import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
        import { getPopularMovies, getTrendingMovies } from '../utils/api';
        
        // Async thunks for fetching data
        export const fetchPopularMovies = createAsyncThunk(
          'movies/fetchPopular',
          async () => {
            const response = await getPopularMovies();
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
        
        // Movie slice definition
        const movieSlice = createSlice({
          name: 'movies',
          initialState: {
            popular: [],   // Store for popular movies
            trending: [],  // Store for trending movies
            loading: false,  // Loading state
            error: null,  // Error state
          },
          reducers: {},
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
              .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload;
              })
              .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
          },
        });
        
        export default movieSlice.reducer;

       ```
  - api.js
    ```javascript
        export const getTrendingMovies = () => api.get('/trending/movie/day');
    ```
   
2. **Dispatch actions** in `Home.js` to fetch popular movies when the component loads.
3. **Integrate `useSelector`** to access movie data from Redux.
   
  - Home.js

    ```javascript
      import React, { useEffect } from 'react';
      import { useDispatch, useSelector } from 'react-redux';
      import { fetchPopularMovies, fetchTrendingMovies } from '../store/movieSlice';
      import MovieCard from './MovieCard'; // Assuming you have a MovieCard component to display movie details
      
      const Home = () => {
        const dispatch = useDispatch();
      
        // Accessing the state from Redux store
        const { popular, trending, loading, error } = useSelector((state) => state.movies);
      
        // Fetching popular and trending movies when the component is mounted
        useEffect(() => {
          dispatch(fetchPopularMovies());
          dispatch(fetchTrendingMovies());
        }, [dispatch]);
      
        return (
          <div className="home">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <h2>Popular Movies</h2>
                <div className="movie-list">
                  {popular.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
      
                <h2>Trending Movies</h2>
                <div className="movie-list">
                  {trending.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      };
      
      export default Home;
    ```

  - App.js
    
    ```javascript

    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import { Provider } from 'react-redux';
    import theme from './styles/theme';
    import store from './redux/store';
    
    // Import pages
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    
    const DRAWER_WIDTH = 240;
    
    function App() {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Box sx={{ display: 'flex' }}>
                {/* Navbar with a fixed drawer width */}
                <Navbar drawerWidth={DRAWER_WIDTH} />

            {/* Main content area */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
                mt: '64px', // Height of navbar
              }}
            >
              <Routes>
                {/* Define routes */}
                <Route path="/" element={<Home />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
      );
    }

    export default App;
    ```
---

### **Day 2 (Wednesday): Genre Functionality and Redux Refinement**
- **Tasks**:
  1. **Set up Redux Toolkit** with `updateSlice` for actions, reducers, and store management.
  2. **Define state slices** for movies, loading, and error handling.

  - api.js

    ```javascript
     export const getGenres = () => {
      return axios.get(`${API_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      };
      ```
      
    - Reducers.js
      ```javascript
          export const fetchGenres = createAsyncThunk(
        'movies/fetchGenres',
        async () => {
          const genres = await getGenres(); // Calling the getGenres function
          return genres; // Return the genres data
        }
      );
      
      // Fetch movies by genre
      export const fetchMoviesByGenre = createAsyncThunk(
        'movies/fetchByGenre',
        async (genreId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
              },
            }
          );
          const data = await response.json();
          return data.results; // Return the list of movies filtered by genre
        }
      );

      const movieSlice = createSlice({
        name: 'movies',
        initialState: {
          popular: [],
          trending: [],
          genres: [],
          genreMovies: [], // Movies filtered by genre
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
             .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
              })
              .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              })
              .addCase(fetchMoviesByGenre.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                state.loading = false;
                state.genreMovies = action.payload; // Storing the filtered movies in the state
              })
              .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
          },
        });

     ```
 
  
---

### **Day 3 (Friday): Prepare for Movie Detail Integration**
- **Tasks**:

  1. Prepare Genre SideBar

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
                      IconButton,
                      Box,
                    } from '@mui/material';
                    import { fetchGenres, setSelectedGenre, clearSelectedGenre } from '../redux/movieSlice';
                    import ClearIcon from '@mui/icons-material/Clear';
                    
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
                        if (selectedGenre?.id === genre.id) {
                          dispatch(clearSelectedGenre());
                        } else {
                          dispatch(setSelectedGenre(genre));
                        }
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
                              <ListItem
                                key={genre.id}
                                disablePadding
                                secondaryAction={
                                  selectedGenre?.id === genre.id && (
                                    <IconButton 
                                      edge="end" 
                                      size="small"
                                      onClick={() => dispatch(clearSelectedGenre())}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  )
                                }
                              >
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
      
  3. **Integrate Genre Sidebar**:
  - Add a genre filter sidebar in the `Home.js` or `App.js` page.
     ```javascript
     import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import { Provider } from 'react-redux';
    import theme from './styles/theme';
    import store from './redux/store';
    
    // Import components
    import Navbar from './components/Navbar';
    import GenreDrawer from './components/GenreDrawer';
    
    // Import pages
    import Home from './pages/Home';
    
    const DRAWER_WIDTH = 240;
    
    function App() {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Box sx={{ display: 'flex' }}>
                <Navbar drawerWidth={DRAWER_WIDTH} />
                <GenreDrawer />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                    mt: '64px', // Height of navbar
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* You can add other routes here */}
                  </Routes>
                </Box>
              </Box>
            </Router>
          </ThemeProvider>
        </Provider>
      );
    }
    
    export default App;
  ```
 
---

## Week 3: Final Integration and Enhancements

### **Goal**: Finalize the Movie App with all features fully integrated and optimized.

### **Day 1 (Monday): Movie Detail Integration**
- **Tasks**:
  1. **Complete integration of `MovieDetail.js`**:

     - Fetch movie details using `useParams` to get the movie ID from the URL.

     ```javascript
     import React, { useEffect, useState } from 'react';
      import { useParams } from 'react-router-dom';
      import {
        Container,
        Grid,
        Typography,
        Box,
        Chip,
        Rating,
      } from '@mui/material';
      import api from '../utils/api';
      
      function MovieDetails() {
        const { id } = useParams();
        const [movie, setMovie] = useState(null);
        const [cast, setCast] = useState([]);
    
      useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            const [movieResponse, creditsResponse] = await Promise.all([
              api.get(`/movie/${id}`),
              api.get(`/movie/${id}/credits`),
            ]);
            setMovie(movieResponse.data);
            setCast(creditsResponse.data.cast.slice(0, 10));
          } catch (error) {
            console.error('Error fetching movie details:', error);
          }
        };
    
        fetchMovieDetails();
      }, [id]);
    
      if (!movie) {
        return (
          <Container>
            <Typography>Loading...</Typography>
          </Container>
        );
      }
    
      return (
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} md={4}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Release Date
            </Typography>
            <Typography variant="body1">
              {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <Grid container spacing={2}>
              {cast.map((actor) => (
                <Grid item key={actor.id}>
                  <Chip
                    label={actor.name}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </Container>
        );
        }
  
      export default MovieDetails;

      ```
     

  2. **Update API calls** in `api.js` to handle fetching individual movie details by ID.
     ```javascript
      export const getMovieDetails = (id) => api.get(`/movie/${id}`);
      ```
  3. Updated App.js
     
     ```javascript
           import React from 'react';
      import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
      import { ThemeProvider, CssBaseline, Box } from '@mui/material';
      import { Provider } from 'react-redux';
      import theme from './styles/theme';
      import store from './redux/store';
      
      // Import pages
      import Home from './pages/Home';
      import MovieDetails from './pages/MovieDetails';
      import Navbar from './components/Navbar';
      import GenreDrawer from './components/GenreDrawer';
      
      const DRAWER_WIDTH = 240;
      
      function App() {
        return (
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <Box sx={{ display: 'flex' }}>
                  <Navbar drawerWidth={DRAWER_WIDTH} />
                  <GenreDrawer />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                      ml: { sm: `${DRAWER_WIDTH}px` },
                      mt: '64px', // Height of navbar
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/movie/:id" element={<MovieDetails />} />
                    </Routes>
                  </Box>
                </Box>
              </Router>
            </ThemeProvider>
          </Provider>
        );
      }
      
      export default App;
  ```
---

### **Day 2 (Wednesday): Routing and Search**
- **Tasks**:
  1. **Prepare `Search.js` component** for searching movies.

     ```javascript

      import React, { useEffect } from 'react';
      import { useLocation } from 'react-router-dom';
      import { useDispatch, useSelector } from 'react-redux';
      import { Container, Grid, Typography, Box } from '@mui/material';
      import { searchMoviesAsync } from '../redux/movieSlice';
      import MovieCard from '../components/MovieCard';
      
      function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      
      function Search() {
        const query = useQuery();
        const searchQuery = query.get('q');
        const dispatch = useDispatch();
        const searchResults = useSelector((state) => state.movies.searchResults);
        const loading = useSelector((state) => state.movies.loading);
    
      useEffect(() => {
        if (searchQuery) {
          dispatch(searchMoviesAsync(searchQuery));
        }
      }, [dispatch, searchQuery]);
    
      if (loading) {
        return (
          <Container>
            <Typography>Loading...</Typography>
          </Container>
        );
      }
    
      return (
        <Container sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Search Results for "{searchQuery}"
            </Typography>
            <Typography color="text.secondary">
              Found {searchResults.length} results
            </Typography>
          </Box>

      <Grid container spacing={3}>
        {searchResults.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {searchResults.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">
            No movies found matching "{searchQuery}"
          </Typography>
          <Typography color="text.secondary">
            Try searching with different keywords
          </Typography>
        </Box>
      )}
      </Container>
        );
        }

      export default Search;

      ```

     
  3. **Connect search to Redux store** to fetch filtered movie data based on search input.
     - api.js
      ```javascript
       export const searchMovies = (query) => api.get(`/search/movie?query=${query}`);
      ```

     - MovieSlice.js
     
       ```javascript
         import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
        import { searchMovies } from '../utils/api';
        
        export const searchMoviesAsync = createAsyncThunk(
          'movies/search',
          async (query) => {
            const response = await searchMovies(query);
            return response.data.results;
          }
        );
        
        const movieSlice = createSlice({
          name: 'movies',
          initialState: {
            searchResults: [],
            loading: false,
            error: null,
          },
          reducers: {},
          extraReducers: (builder) => {
            builder
              .addCase(searchMoviesAsync.pending, (state) => {
                state.loading = true;
              })
              .addCase(searchMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
              })
              .addCase(searchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
          },
        });
        
        export default movieSlice.reducer;
      ```

   
  5. **Integrate search results** in the `NavBar.js` page to display searched movies.

      - Declaring State Management for Search

     ```javascript
       const [searchQuery, setSearchQuery] = useState('');
     ```
    - Handle Search Query 

   ```javascript
     const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      };

   ```

    - Form for Search 

   ```javascript
     <Box component="form" onSubmit={handleSearch}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search movies…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>
      </Box>
     ```

---

### **Day 3 (Friday): WatchList and Final Features**
- **Tasks**:
  1. **Add WatchList functionality**:
     - Create a WatchList component to store and display favorite movies.

        ```javascript

         import React from 'react';
        import { useSelector } from 'react-redux';
        import { Container, Grid, Typography, Box } from '@mui/material';
        import MovieCard from '../components/MovieCard';
        
        function Watchlist() {
          const watchlist = useSelector((state) => state.movies.watchlist);
        
          return (
            <Container sx={{ py: 4 }}>
              <Typography variant="h4" gutterBottom>
                My Watchlist
              </Typography>

          {watchlist.length > 0 ? (
            <Grid container spacing={3}>
              {watchlist.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Your watchlist is empty
              </Typography>
              <Typography color="text.secondary">
                Start adding movies to your watchlist by clicking the bookmark icon on any movie card
              </Typography>
            </Box>
          )}
        </Container>
          );
        }
    
        export default Watchlist;

        ```


       
     - Use Redux to manage the WatchList state.
     - Implement add/remove functionality for movies in the WatchList.
       
       ```javscript
       reducers: {
        addToWatchlist: (state, action) => {
          state.watchlist.push(action.payload);
        },
        removeFromWatchlist: (state, action) => {
          state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload.id);
        },
        }
       ```
     
       ```javascript
        initialState: {
        popular: [],
        trending: [],
        searchResults: [],
        watchlist: [], // This holds the user's watchlist
        genres: [],
        selectedGenre: null,
        genreMovies: [],
        loading: false,
        error: null,
        }
       ```
      ```javascript
      export const { addToWatchlist, removeFromWatchlist, setSelectedGenre, clearSelectedGenre } = movieSlice.actions;
      ```
            
  3. **Test the MovieDetail.js page** thoroughly for performance and edge cases.

     -  MovieCard.js and MovieDetails.js
     
     ```javascript
       import { BookmarkBorder, Bookmark } from '@mui/icons-material';
       import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
     ```
     
     ```javascript
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
      ```

      ```javascript
     <IconButton
      onClick={handleWatchlistClick}
      color="primary"
      sx={{ padding: 0 }}
      >
      {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
  
      ```
     - NavBar.js
     ```javascript
     import BookmarkIcon from '@mui/icons-material/Bookmark';
     
     <Button
          color="inherit"
          component={Link}
          to="/watchlist"
          startIcon={<BookmarkIcon />}
        >
          Watchlist
        </Button>
     ```
    - App.js

  ```javascript
  <Route path="/watchlist" element={<Watchlist />} />
  ```
---

## Conclusion
App.js

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import store from './redux/store';

// Import pages
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';
import GenreDrawer from './components/GenreDrawer';

const DRAWER_WIDTH = 240;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Navbar drawerWidth={DRAWER_WIDTH} />
            <GenreDrawer />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
                mt: '64px', // Height of navbar
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

```

Reducers.js

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, searchMovies, getTrendingMovies } from '../utils/api';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await getPopularMovies();
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

export const searchMoviesAsync = createAsyncThunk(
  'movies/search',
  async (query) => {
    const response = await searchMovies(query);
    return response.data.results;
  }
);

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.genres;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchByGenre',
  async (genreId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    trending: [],
    searchResults: [],
    watchlist: [],
    genres: [],
    selectedGenre: null,
    genreMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload.id);
    },
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
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreMovies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist, setSelectedGenre, clearSelectedGenre } = movieSlice.actions;
export default movieSlice.reducer;
```
