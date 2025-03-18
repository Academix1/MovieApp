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
import React, { useEffect } from 'react';//[pause]Import React and useEffect hook
import { useDispatch, useSelector } from 'react-redux';//[pause]Import Redux hooks for state management
import { useLocation } from 'react-router-dom';//[pause]Import useLocation to read URL query parameters
import { Container, Typography, Grid } from '@mui/material';//[pause]Import UI components from MUI
import { searchMoviesAsync } from '../redux/movieSlice';//[pause]Import async action to fetch search results
import MovieCard from '../components/MovieCard';//[pause]Import MovieCard component to display each movie
import Loading from '../components/Loading';//[pause]Import Loading component for displaying a loading indicator
import { AppDispatch } from '../redux/store';//[pause]Import AppDispatch type to correctly type useDispatch

// Define Movie type to structure the movie data
interface Movie {
  id: number;//[pause]Unique identifier for each movie
  title: string;//[pause]Movie title
  poster_path: string;//[pause]Path to the movie poster image
  vote_average: number | null;//[pause]Movie rating, nullable if not available
}

// Define RootState to structure the state shape from Redux store
interface RootState {
  movies: {
    searchResults: Movie[];//[pause]Stores search results in an array of Movie objects
    loading: boolean;//[pause]Indicates whether search is in progress
  };
}

// Custom hook to get query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);//[pause]Extract search query parameters from URL
}

const Search: React.FC = () => {
  const query = useQuery();//[pause]Get URL search parameters
  const searchQuery = query.get('q');//[pause]Extract 'q' parameter from the URL
  const dispatch = useDispatch<AppDispatch>();//[pause]Get Redux dispatch function with correct type
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);//[pause]Select search results and loading state from Redux store

  // Fetch search results whenever searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));//[pause]Dispatch action to search for movies
    }
  }, [dispatch, searchQuery]);//[pause]Dependency array ensures effect runs when searchQuery changes

  // Show loading indicator if movies are being searched
  if (loading) {
    return <Loading message="Searching movies..." />;//[pause]Display loading component with message
  }

  return (
    <Container sx={{ py: 4 }}>//[pause]
      <Typography variant="h4" gutterBottom>//[pause]
        Search Results for "{searchQuery}"
      </Typography>
      <Grid container spacing={3}>//[pause]
        {searchResults.map((movie) => (//[pause]Map over searchResults and render MovieCard for each movie
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>//[pause]
            <MovieCard movie={movie} />//[pause]
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;//[pause]Export Search component
```
### NavBar.ts(Vite)
```js
import React, { useState } from 'react';//[pause] Importing React and useState hook for state management
import { useNavigate } from 'react-router-dom';//[pause] Importing useNavigate for programmatic navigation
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';//[pause] Importing Material-UI components
import { styled, alpha } from '@mui/material/styles';//[pause] Importing styled components and alpha utility from Material-UI
import SearchIcon from '@mui/icons-material/Search';//[pause] Importing search icon from Material-UI icons

//[pause] Styled component for the search bar container
const Search = styled('div')(({ theme }) => ({
  position: 'relative',//[pause] Positions elements relative to this container
  borderRadius: theme.shape.borderRadius,//[pause] Applies border-radius from theme
  backgroundColor: alpha(theme.palette.common.white, 0.15),//[pause] Sets background color with transparency
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),//[pause] Darkens background on hover
  },
  marginLeft: theme.spacing(2),//[pause] Adds left margin spacing
  width: 'auto',//[pause] Allows dynamic width
}));

//[pause] Styled component for the search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),//[pause] Adds padding on left and right
  height: '100%',//[pause] Sets height to fill the parent container
  position: 'absolute',//[pause] Positions the icon absolutely within the search container
  pointerEvents: 'none',//[pause] Prevents the icon from being interactable
  display: 'flex',//[pause] Uses flexbox for alignment
  alignItems: 'center',//[pause] Centers items vertically
  justifyContent: 'center',//[pause] Centers items horizontally
}));

//[pause] Styled component for the input field inside the search bar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',//[pause] Inherits text color from parent
  '& .MuiInputBase-input': {//[pause] Styles the actual input field
    padding: theme.spacing(1, 1, 1, 0),//[pause] Adds padding to the input field
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,//[pause] Adjusts left padding to accommodate the icon
    transition: theme.transitions.create('width'),//[pause] Adds a smooth transition effect for width changes
    width: '12ch',//[pause] Sets default width of input field
    [theme.breakpoints.up('md')]: {//[pause] Adjusts width for medium and larger screens
      width: '20ch',
    },
  },
}));

//[pause] Navbar functional component
const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');//[pause] State for storing search input value
  const navigate = useNavigate();//[pause] Hook for navigation

  //[pause] Function to handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();//[pause] Prevents default form submission behavior
    if (searchQuery.trim()) {//[pause] Checks if search query is not empty
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);//[pause] Navigates to search results page with query
      setSearchQuery('');//[pause] Clears the search input after submission
    }
  };

  return (
    <AppBar position="fixed">{/*[pause] Fixed position navigation bar */}
      <Toolbar>{/*[pause] Toolbar for structuring Navbar content */}
        <Typography variant="h6" component="div">{/*[pause] App title */}
          Movie App
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ ml: 'auto' }}>{/*[pause] Search form with left margin auto for alignment */}
          <Search>{/*[pause] Search bar container */}
            <SearchIconWrapper>{/*[pause] Wrapper for search icon */}
              <SearchIcon />{/*[pause] Search icon */}
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."//[pause] Placeholder text inside the input field
              inputProps={{ 'aria-label': 'search' }}//[pause] Accessibility label for input
              value={searchQuery}//[pause] Binds input field to state
              onChange={(e) => setSearchQuery(e.target.value)}//[pause] Updates state on input change
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;//[pause] Exports Navbar component for use in other files
```

### MovieSlice.tsx
```js
import React, { useState } from 'react';import { useNavigate } from 'react-router-dom';import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';import { styled, alpha } from '@mui/material/styles';import SearchIcon from '@mui/icons-material/Search';

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
