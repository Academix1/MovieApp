import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchMoviesByGenre,
} from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

function Home() {
  const dispatch = useDispatch();
  const {
    popular,
    trending,
    genreMovies,
    selectedGenre,
    loading,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (selectedGenre) {
      dispatch(fetchMoviesByGenre(selectedGenre.id));
    } else {
      dispatch(fetchPopularMovies());
      dispatch(fetchTrendingMovies());
    }
  }, [dispatch, selectedGenre]);

  if (loading) {
    return <Loading />;
  }

  if (selectedGenre) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedGenre.name} Movies
        </Typography>
        <Grid container spacing={3}>
          {genreMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
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
