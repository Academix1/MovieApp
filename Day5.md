
## `Axios,UseState and Use Effect`

### `Installations`
```
npm install axios
```

### `project/.env`
```
VITE_TMDB_API_KEY=Token
```

```Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for a Movie item based on the API response
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home = () => {
  // Define the state types for movies, loading, and error
  const [movies, setMovies] = useState<Movie[]>([]); // Type the state as an array of Movie
  const [loading, setLoading] = useState<boolean>(true); // State for loading (boolean)
  const [error, setError] = useState<string | null>(null); // State for error (string or null)

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const accessToken = import.meta.env.VITE_TMDB_API_KEY;
        if (!accessToken) {
          setError("API Key is missing.");
          setLoading(false);
          return;
        }

        // Fetch popular movies from the API
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: accessToken, // Use the API key from the environment
            },
          }
        );

        setMovies(data.results); // Set movies data to state
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchMovies();
  }, []); // Run this effect only once when the component mounts

  // Display loading message
  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  // Display error message
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
```
