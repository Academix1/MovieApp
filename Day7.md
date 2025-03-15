
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
import React, { useEffect } from 'react'; //[pause]
import { useDispatch, useSelector } from 'react-redux'; //[pause]
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice'; //[pause]
import { RootState, AppDispatch } from '../redux/store'; //[pause]
import MovieCard from './MovieCard'; //[pause]

const Home: React.FC = () => { //[pause]
  const dispatch = useDispatch<AppDispatch>(); //[pause]
  const { popularMovies, trendingMovies, loading, error } = useSelector( //[pause]
    (state: RootState) => state.movies //[pause]
  ); //[pause]

  useEffect(() => { //[pause]
    dispatch(fetchPopularMovies()); //[pause]
    dispatch(fetchTrendingMovies()); //[pause]
  }, [dispatch]); //[pause]

  if (loading) return <p>Loading...</p>; //[pause]
  if (error) return <p>{error}</p>; //[pause]

  return ( //[pause]
    <div> //[pause]
      <h2>Popular Movies</h2> //[pause]
      <div style={gridStyle}> //[pause]
        {popularMovies.map((movie: any) => ( //[pause]
          <MovieCard key={movie.id} movie={movie} /> //[pause]
        ))} //[pause]
      </div> //[pause]

      <h2>Trending Movies</h2> //[pause]
      <div style={gridStyle}> //[pause]
        {trendingMovies.map((movie: any) => ( //[pause]
          <MovieCard key={movie.id} movie={movie} /> //[pause]
        ))} //[pause]
      </div> //[pause]
    </div> //[pause]
  ); //[pause]
}; //[pause]

const gridStyle = { //[pause]
  display: 'grid', //[pause]
  gridTemplateColumns: 'repeat(4, 1fr)', //[pause]
  gap: '16px', //[pause]
  padding: '0 16px', //[pause]
}; //[pause]

export default Home;
```
