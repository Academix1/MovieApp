
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
import React from 'react'; //[pause]
import { Card, CardContent, Typography, CardMedia } from '@mui/material'; //[pause]

interface Movie { //[pause]
  title: string; //[pause]
  poster_path: string; //[pause]
  vote_average: number | null; //[pause]
} //[pause]

interface MovieCardProps { //[pause]
  movie: Movie; //[pause]
} //[pause]

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => { //[pause]
  return ( //[pause]
    <Card //[pause]
      sx={{ //[pause]
        height: '100%', //[pause]
        display: 'flex', //[pause]
        flexDirection: 'column', //[pause]
        cursor: 'pointer', //[pause]
        boxShadow: 3, //[pause]
        borderRadius: 2, //[pause]
        overflow: 'hidden', //[pause]
      }} //[pause]
    > //[pause]
      <CardMedia //[pause]
        component="img" //[pause]
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} //[pause]
        alt={movie.title} //[pause]
        sx={{ //[pause]
          height: 350, //[pause]
          objectFit: 'cover', //[pause]
          width: '100%', //[pause]
        }} //[pause]
      /> //[pause]
      <CardContent sx={{ flexGrow: 1, padding: 1 }}> //[pause]
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}> //[pause]
          {movie.title} //[pause]
        </Typography> //[pause]
        <Typography variant="body2" color="text.secondary"> //[pause]
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10 //[pause]
        </Typography> //[pause]
      </CardContent> //[pause]
    </Card> //[pause]
  ); //[pause]
} //[pause]

export default MovieCard;
```

### `Home.tsx` (VITE)
```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import MovieCard from './MovieCard';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, trendingMovies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
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

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  padding: '0 16px',
};

export default Home;
```
