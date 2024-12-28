import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <IconButton
            onClick={handleWatchlistClick}
            color="primary"
            sx={{ padding: 0 }}
          >
            {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
