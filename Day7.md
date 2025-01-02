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

<summary><strong>src/pages/Home.js</strong></summary>

```javascript

  return (
    <Container sx={{ py: 4 }}>
      {/* Popular Movies */}
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

      {/* Trending Now */}
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

```
