
### `src/pages/Loading.js (Type Simulator) `

```javascript
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading({ message = 'Loading...' }) {
//[pause]
  return (
//[pause]
<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
//[pause]
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography color="text.secondary">{message}</Typography>
//[pause]
    </Box>
  );
}
//[pause]
export default Loading;
```
  
### `MovieCard.ts (VITE)`
```ts
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

// Define the Movie type based on the data structure expected
interface Movie {
  title: string;
  poster_path: string;
  vote_average: number | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
      sx={{
        height: '100%',  // Ensures the card takes full available height
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 3,  // Optional: Add a slight shadow for better visual appeal
        borderRadius: 2,  // Rounded corners for the card
        overflow: 'hidden', // Prevents overflow from the image
      }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Assuming poster_path is the key in your movie object
        alt={movie.title}
        sx={{
          height: 350,  // Reduced height for the image
          objectFit: 'cover',  // Maintains aspect ratio while covering the area
          width: '100%',  // Ensures the image takes the full width of the card
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
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

### `Home.tsx` (VITE)
```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice'; // Ensure the correct path
import { RootState, AppDispatch } from '../redux/store'; // Import AppDispatch type
import MovieCard from './MovieCard'; // Import MovieCard

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const { popularMovies, trendingMovies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies()); // Dispatch async action
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Popular Movies</h2>
      <div style={gridStyle}>
        {popularMovies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Trending Movies</h2>
      <div style={gridStyle}>
        {trendingMovies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// Style for displaying 4 items per row and proper indentation
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Create 4 equal-width columns
  gap: '16px', // Space between cards
  padding: '0 16px', // Indentation for better appearance
};

export default Home;
```
