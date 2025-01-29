### `src/pages/MovieDetails.js (Type Simulator)`

```javascript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import api from '../utils/api'; // Ensure this points to your API utility
import Loading from '../components/Loading'; // Ensure this component exists and is correctly implemented

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface Actor {
  id: number;
  name: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Type for route parameters
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
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
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>
          <Rating value={movie.vote_average / 2} readOnly />
          <Typography paragraph>{movie.overview}</Typography>
          <Typography>Release Date: {movie.release_date}</Typography>
          <Box mt={2}>
            {cast.map((actor) => (
              <Chip
                key={actor.id}
                label={actor.name}
                sx={{ margin: '4px' }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;

```
### `src/componenets/MovieCard.js(Manual)`

```javascript
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

// Define the Movie type based on the data structure expected
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access watchlist state from Redux store
  const watchlist = useSelector((state: any) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m: Movie) => m.id === movie.id);

  // Handle click for adding/removing movie from watchlist
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the card's onClick
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  // Handle navigation to movie details page
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the MovieDetails page with the movie ID
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        height: 'auto',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        position: 'relative',
      }}
      onClick={handleCardClick} // Navigate to MovieDetails on card click
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{
          height: 250,
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: '1.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
          </Typography>
        </Box>
      </CardContent>

      {/* Watchlist Icon */}
      <IconButton
        onClick={handleWatchlistClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: isInWatchlist ? 'primary.main' : 'text.secondary',
        }}
      >
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;


```




### `src/App.js (main)`

```javascript

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import { store } from './redux/store';
import Search from './pages/Search';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Watchlist from './pages/WatchList';
import Navbar from './components/NavBar';
import GenreDrawer from './components/GenreDrawer';

const drawerWidth = 240; // Must match the width set in GenreDrawer

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* Navbar: fixed position to remain at the top */}
          <Navbar />
          <Box sx={{ display: 'flex', mt: 8 }}>
            {/* Sidebar: GenreDrawer */}
            <Box
              component="aside"
              sx={{
                width: { xs: '100%', sm: `${drawerWidth}px` }, // Full width on small screens, fixed on larger
                flexShrink: 0,
                position: 'fixed',
                top: '64px', // Move the drawer down to start below the navbar
                height: 'calc(100vh - 64px)', // Subtract Navbar height
                overflowY: 'auto',
                borderRight: '1px solid #e0e0e0',
                bgcolor: 'background.paper',
              }}
            >
              <GenreDrawer />
            </Box>

            {/* Main Content: Adjust content area based on sidebar */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                ml: { sm: `${drawerWidth}px` }, // Leave space for the sidebar on larger screens
                p: 3,
              }}
            >
              <Toolbar /> {/* Adds space below the navbar for content */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
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
