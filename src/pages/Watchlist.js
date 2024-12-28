import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const watchlist = useSelector((state) => state.movies.watchlist);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>

      {watchlist.length > 0 ? (
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Your watchlist is empty
          </Typography>
          <Typography color="text.secondary">
            Start adding movies to your watchlist by clicking the bookmark icon on any movie card
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Watchlist;
