# 12-Day Incremental Plan to Build a Movie App

This plan outlines how to build a Movie App incrementally over 12 days. Each day introduces new concepts and features with accompanying code snippets to demonstrate how the application evolves into a fully functional product.

---

## **Day 1: Basic Project Setup**

### **Goal**

- Initialize a React project (using Create React App or Vite).
- Render a simple "Hello World" in the browser.

### **Steps**

1. Run `npx create-react-app movie-app` (or `yarn create react-app movie-app`).
2. Navigate into the new folder: `cd movie-app`.
3. Open in your code editor.
4. Replace the contents of `src/App.js` with a minimal component.

### **Code After Day 1**

#### `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `src/App.js`

```js
import React from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

Run `npm start` (or `yarn start`) to see "Hello World" on the screen.

---

## **Day 2: Introducing React Router & Pages**

### **Goal**

- Set up React Router.
- Create basic page components (Home, MovieDetails, Search, Watchlist).
- Add `<Routes>` and `<Route>` in `App.js`.

### **Steps**

1. Install React Router: `npm install react-router-dom`.
2. Create a folder `src/pages` and add four basic pages.
3. Wrap your `<App />` content in `<BrowserRouter>` and define routes.

### **Code After Day 2**

#### `src/App.js`

```js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Page components
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
```

#### `src/pages/Home.js`

```js
import React from 'react';

function Home() {
  return <h2>Home Page</h2>;
}

export default Home;
```

Similarly, create `MovieDetails.js`, `Search.js`, and `Watchlist.js` with simple placeholders.

---

## **Day 3: Adding Material UI & Theming**

### **Goal**

- Install and configure Material UI.
- Wrap the app with a custom theme using `<ThemeProvider>`.
- Introduce `AppBar` and a basic `Navbar` component.

### **Steps**

1. Install MUI: `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`.
2. Create `src/styles/theme.js` for your custom theme.
3. Create a basic `Navbar` component using MUI’s `AppBar`.
4. Wrap `<App />` with `<ThemeProvider>` and `<CssBaseline>`.

### **Code After Day 3**

#### `src/styles/theme.js`

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // Netflix-like red
    },
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
```

#### `src/components/Navbar.js`

```js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          Movie App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
```

#### Updated `src/App.js`

```js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box sx={{ mt: 8 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

Run the app and notice the dark theme with the red `AppBar`.

---

# **Day 4: Setting Up Redux Toolkit & Store**

### **Goal**
- Install Redux Toolkit and set up a global store.
- Wrap the app with `<Provider>` for state management.

### **Steps**
1. Install Redux Toolkit and React Redux:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
2. Create the following files:
   - `src/redux/store.js`
   - `src/redux/movieSlice.js`
3. Add a placeholder slice to demonstrate Redux usage.
4. Wrap `<App />` with `<Provider store={store}>`.

---

### **Code After Day 4**

<details>
<summary><strong>src/redux/movieSlice.js</strong></summary>

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placeholder: 'Redux is working!',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Add actions here in the future
  },
});

export default movieSlice.reducer;
```

</details>

<details>
<summary><strong>src/redux/store.js</strong></summary>

```js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
```

</details>

<details>
<summary><strong>src/App.js (Updated)</strong></summary>

```js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import { store } from './redux/store';

// Pages
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

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
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

</details>

---

### **Verification**
After completing these steps:
1. Open your app and check the Redux DevTools.
2. Verify that the default state is:
   ```json
   {
     "movies": {
       "placeholder": "Redux is working!"
     }
   }
   ```

Now you have a working Redux store integrated into your React app, ready for future enhancements like fetching and storing data.

---

```markdown
# Day 5: Fetching Popular & Trending Movies (Redux Thunks)

### Goal
- Introduce async thunks to fetch data from TMDB.
- Store popular and trending movies in Redux state.
- Display them on the Home page.

### Steps
1. Create helper functions in `src/utils/api.js` for API calls.
2. Add thunks to `movieSlice.js` to fetch popular and trending movies.
3. Dispatch these thunks from `Home.js` using `useEffect`.

### Code After Day 5

<details>
<summary><strong>src/utils/api.js</strong></summary>

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
export const getTrendingMovies = () => api.get('/trending/movie/day');

export default api;
```
</details>

<details>
<summary><strong>src/redux/movieSlice.js</strong></summary>

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, getTrendingMovies } from '../utils/api';

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

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    trending: [],
    loading: false,
    error: null,
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
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      });
  },
});

export default movieSlice.reducer;
```
</details>

<details>
<summary><strong>src/pages/Home.js</strong></summary>

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice';

function Home() {
  const dispatch = useDispatch();
  const { popular, trending, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Popular Movies</h2>
      <ul>
        {popular.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <h2>Trending Movies</h2>
      <ul>
        {trending.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
```
</details>

---

# Day 6: Improving UI with Material UI Components (Home Page)

### Goal
- Replace basic `<ul>` lists with Material UI components (Container, Typography, Grid).
- Show a simple loading indicator.

### Steps
1. Create a `Loading.js` component.
2. Update `Home.js` to use Material UI's `Grid`, `Container`, etc.

### Code After Day 6

<details>
<summary><strong>src/components/Loading.js</strong></summary>

```javascript
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

export default Loading;
```
</details>

<details>
<summary><strong>src/pages/Home.js</strong></summary>

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/MovieSlice';
import Loading from '../components/Loading';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function Home() {
  const dispatch = useDispatch();
  const { popular, trending, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading message="Fetching movies..." />;
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Popular Movies */}
      <Typography variant="h4" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {popular.slice(0, 6).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trending Now */}
      <Typography variant="h4" gutterBottom>
        Trending Now
      </Typography>
      <Grid container spacing={3}>
        {trending.slice(0, 6).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;

```
</details>

---

# Day 7: Creating a MovieCard Component

### Goal
- Extract repeated layout code into a reusable `<MovieCard>` component.
- Replace the placeholder `<div>` with Material UI's `<Card>` component.

### Steps
1. Create `MovieCard.js` in `src/components`.
2. Use `<Card>` and `<CardContent>` to display the movie title.

### Code After Day 7

<details>
<summary><strong>src/components/MovieCard.js</strong></summary>

```javascript
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function MovieCard({ movie }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Assuming poster_path is the key in your movie object
        alt={movie.title}
        sx={{
          height: 300,
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;

```
</details>

<details>
<summary><strong>src/pages/Home.js</strong></summary>

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';

function Home() {
  const dispatch = useDispatch();
  const { popular, trending, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading message="Fetching movies..." />;
  }

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
</details>

---

# Day 8: Search Feature (Navbar & Search Page)

### Goal
- Add a search input to the Navbar that navigates to `/search`.
- Parse query strings (`?q=`) in `Search.js` and fetch results.

### Steps
1. Extend `Navbar.js` with a search form.
2. Create `searchMoviesAsync` thunk in `movieSlice.js`.
3. Update `Search.js` to display fetched results.

### Code After Day 8

<details>
<summary><strong>src/components/Navbar.js</strong></summary>

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
</details>

<details>
<summary><strong>src/redux/movieSlice.js</strong></summary>

```javascript
export const searchMoviesAsync = createAsyncThunk(
  'movies/search',
  async (query) => {
    const response = await api.get(`/search/movie?query=${query}`);
    return response.data.results;
  }
);

const movieSlice = createSlice({
  // other reducers
  extraReducers: (builder) => {
    builder.addCase(searchMoviesAsync.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export default movieSlice.reducer;
```
</details>

<details>
<summary><strong>src/pages/Search.js</strong></summary>

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { searchMoviesAsync } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.movies);

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
}

export default Search;
```
```markdown
# Day 9: Watchlist Feature

### Goal
- Let users add or remove movies from a watchlist stored in Redux.
- Display the watchlist in the `Watchlist.js` page.

### Steps
1. Add a `watchlist` array to Redux state.
2. Create `addToWatchlist` and `removeFromWatchlist` reducers in `movieSlice.js`.
3. Add a bookmark icon to toggle watchlist status in `MovieCard.js`.
4. Display watchlist movies in the `Watchlist.js` page.

### Code After Day 9

<details>
<summary><strong>src/redux/movieSlice.js</strong></summary>

```javascript
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    watchlist: [],
    // other states
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

export const { addToWatchlist, removeFromWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
```
</details>

<details>
<summary><strong>src/components/MovieCard.js</strong></summary>

```javascript
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

  return (
    <Card>
      {/* Movie content */}
      <IconButton onClick={handleWatchlistClick}>
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Card>
  );
}
```
</details>

<details>
<summary><strong>src/pages/Watchlist.js</strong></summary>

```javascript
function Watchlist() {
  const watchlist = useSelector((state) => state.movies.watchlist);

  return (
    <Container>
      <Typography variant="h4">My Watchlist</Typography>
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
```
</details>

---

# Day 10: Genre Drawer & Filtering

### Goal
- Fetch genres and store them in Redux.
- Create a `GenreDrawer` component.
- Filter movies by selected genre.

### Steps
1. Add `genres`, `selectedGenre`, and `genreMovies` to Redux state.
2. Create a `GenreDrawer` component with a list of genres.
3. Update `Home.js` to display movies based on the selected genre.

### Code After Day 10

<details>
<summary><strong>src/redux/movieSlice.js</strong></summary>

```javascript
export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
});

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
    // other states
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
});
export const { setSelectedGenre, clearSelectedGenre } = movieSlice.actions;
```
</details>

<details>
<summary><strong>src/components/GenreDrawer.js</strong></summary>

```javascript
function GenreDrawer() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies.genres);
  const selectedGenre = useSelector((state) => state.movies.selectedGenre);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreClick = (genre) => {
    dispatch(setSelectedGenre(genre));
  };

  return (
    <Drawer>
      <List>
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            selected={selectedGenre?.id === genre.id}
            onClick={() => handleGenreClick(genre)}
          >
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default GenreDrawer;
```
</details>

---

# Day 11: Movie Details Page (Cast, Poster, Ratings)

### Goal
- Display detailed movie information in `MovieDetails.js`.
- Include cast, release date, rating, and watchlist button.

### Steps
1. Use `useParams` to get the movie ID.
2. Fetch detailed movie information and cast.
3. Display the details in a styled layout.

### Code After Day 11

<details>
<summary><strong>src/pages/MovieDetails.js</strong></summary>

```javascript
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [movieRes, creditsRes] = await Promise.all([
        api.get(`/movie/${id}`),
        api.get(`/movie/${id}/credits`),
      ]);
      setMovie(movieRes.data);
      setCast(creditsRes.data.cast.slice(0, 10));
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={movie.poster_path} alt={movie.title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3">{movie.title}</Typography>
          <Rating value={movie.vote_average / 2} readOnly />
          <Typography>{movie.overview}</Typography>
          <Typography>Release Date: {movie.release_date}</Typography>
          <Box>
            {cast.map((actor) => (
              <Chip key={actor.id} label={actor.name} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
```
</details>

---

# Day 12: Final Review & Deployment

### Goal
- Review all code, clean up unused imports.
- Ensure `.env` usage for the API key.
- Deploy the app to a hosting platform.

### Steps
1. Clean up code and ensure functionality.
2. Add `.env` for `REACT_APP_TMDB_ACCESS_TOKEN`.
3. Run `npm run build` and deploy to Vercel or Netlify.

### Final Folder Structure

```plaintext
movie-app/
  public/
    index.html
  src/
    App.js
    index.js
    components/
      GenreDrawer.js
      Loading.js
      MovieCard.js
      Navbar.js
    pages/
      Home.js
      MovieDetails.js
      Search.js
      Watchlist.js
    redux/
      movieSlice.js
      store.js
    utils/
      api.js
  .env
```

### Hosting Options
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)

Once deployed, share the live app link!
```

