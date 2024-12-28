import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import api from '../utils/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m) => m.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  if (!movie) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" component="h1">
              {movie.title}
            </Typography>
            <Button
              variant="outlined"
              startIcon={isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
              onClick={handleWatchlistClick}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Release Date
            </Typography>
            <Typography variant="body1">
              {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <Grid container spacing={2}>
              {cast.map((actor) => (
                <Grid item key={actor.id}>
                  <Chip
                    label={actor.name}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MovieDetails;
