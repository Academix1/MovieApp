
- MovieSlice
```javascript
import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    watchlist: [],
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

export const {
  addToWatchlist,
  removeFromWatchlist,
} = movieSlice.actions;

export default movieSlice.reducer;

```

- MovieCard
```javascript
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
} from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative', // Ensure the IconButton is positioned correctly
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use the movie poster URL
        alt={movie.title}
        sx={{ objectFit: 'cover', borderRadius: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} {/* Display release year */}
        </Typography>
      </CardContent>
      <IconButton
        onClick={handleWatchlistClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: isInWatchlist ? 'primary.main' : 'text.secondary', // Change icon color based on watchlist status
        }}
      >
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Card>
  );
}

export default MovieCard;

```
- WatchList
  ```javascript
  import React from 'react';
  import { useSelector } from 'react-redux';
  import { Container, Typography, Grid } from '@mui/material';
  import MovieCard from './MovieCard'; // Ensure the path to MovieCard is correct
  
  function Watchlist() {
    const watchlist = useSelector((state) => state.movies.watchlist);
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          My Watchlist
        </Typography>
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
  
  export default Watchlist;
  ```

- NavBar
  
```javascript
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const handleWatchlistClick = () => {
    navigate('/watchlist');
  };

 <Button
          color="inherit"
          onClick={handleWatchlistClick}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Watchlist
        </Button>
```
