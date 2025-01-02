
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
