### `src/components/MovieCard.js (Type Simulator)`

```javascript
import React from 'react';
//[pause]
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
//[pause]
function MovieCard({ movie }) {
//[pause]
return (
//[pause]
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
//[pause]
  <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Assuming poster_path is the key in your movie object
        alt={movie.title}
        sx={{
          height: 300,
          objectFit: 'cover',
        }}
      />
//[pause]
      <CardContent sx={{ flexGrow: 1 }}>
//[pause]
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
//[pause]
<Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
        </Typography>
//[pause]
</CardContent>
    </Card>
//[pause]
  );
}
//[pause]
export default MovieCard;

```
### `src/pages/Loading.js (Type Simulator) `

```javascript
import React from 'react';
//[pause]
import { Box, CircularProgress, Typography } from '@mui/material';
//[pause]

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


### `src/pages/Home.js(Type Simulator) `

```javascript

  return (
//[pause]
    <Container sx={{ py: 4 }}>
//[pause]
      <Typography variant="h4" gutterBottom>
        Popular Movies
      </Typography>
//[pause]

      <Grid container spacing={3} sx={{ mb: 4 }}>
//[pause]
  {popular.slice(0, 6).map((movie) => (
//[pause]
    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
//[pause]
      <MovieCard movie={movie} />
    </Grid>
  ))}
</Grid>

//[pause]
      <Typography variant="h4" gutterBottom>
        Trending Now
      </Typography>
//[pause]
      <Grid container spacing={3}>
  {trending.slice(0, 6).map((movie) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
//[pause]
      <MovieCard movie={movie} />
    </Grid>
  ))}
</Grid>
//[pause]
    </Container>
  );
}

```

### src/pages/Home.js(main)
````javascript
  import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';

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
````    
  
