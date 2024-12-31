### MovieDetails.js

```
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Grid, Typography, Box, Chip, Rating } from '@mui/material';
import api from '../util/api'; // Ensure this points to your API utility
import Loading from '../components/Loading'; // Ensure this component exists and is correctly implemented

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>
          <Rating value={movie.vote_average / 2} readOnly />
          <Typography paragraph>{movie.overview}</Typography>
          <Typography>Release Date: {movie.release_date}</Typography>
          <Box mt={2}>
            {cast.map((actor) => (
              <Chip
                key={actor.id}
                label={actor.name}
                sx={{ margin: '4px' }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MovieDetails;
```
### MovieCardUpdate.js

```javascript
const handleCardClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the MovieDetails page with movie ID
  };
```
