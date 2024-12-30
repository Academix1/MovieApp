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
