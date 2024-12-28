import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@mui/material';
import { searchMoviesAsync } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movies.searchResults);
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{searchQuery}"
        </Typography>
        <Typography color="text.secondary">
          Found {searchResults.length} results
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {searchResults.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {searchResults.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">
            No movies found matching "{searchQuery}"
          </Typography>
          <Typography color="text.secondary">
            Try searching with different keywords
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Search;
