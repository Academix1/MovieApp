
## `Axios,UseState and Use Effect`

### `src/pages/Home.js(Type Simulator)`
```javascript
import React, { useEffect, useState } from 'react';
//[pause]
import axios from 'axios';
//[pause]
function Home() {
//[pause]
  const [movies, setMovies] = useState([]);
//[pause]
  const [loading, setLoading] = useState(true);
//[pause]
  const [error, setError] = useState(null);
//[pause]
  const getAccessToken = () => process.env.REACT_APP_TMDB_ACCESS_TOKEN;
//[pause]
  useEffect(() => {
//[pause]
    const fetchMovies = async () => {
//[pause]
      const accessToken = getAccessToken();
//[pause]
      if (!accessToken) {
//[pause]
        setError('API Key is missing');
//[pause]
        setLoading(false);
//[pause]
        return;
//[pause]
      }
//[pause]
      try {
//[pause]
        const response = await axios.get(
//[pause]
          `https://api.themoviedb.org/3/movie/popular`,
//[pause]
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
//[pause]
        setMovies(response.data.results);
//[pause]
        setLoading(false);
//[pause]
      } catch (error) {
//[pause]
        setError('Failed to fetch movies');
//[pause]
        setLoading(false);
//[pause]
      }
//[pause]
    };
//[pause]
    fetchMovies();
//[pause]
  }, []);
//[pause]
  if (loading) {
//[pause]
    return <h2>Loading movies...</h2>;
//[pause]
  }
//[pause]
  if (error) {
//[pause]
    return <h2>{error}</h2>;
//[pause]
  }
//[pause]
  return (
//[pause]
    <div style={{ padding: '20px' }}>
//[pause]
      <h2>Popular Movies</h2>
//[pause]
      <ul>
//[pause]
        {movies.map((movie) => (
//[pause]
          <li key={movie.id}>
//[pause]
            <h3>{movie.title}</h3>
//[pause]
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px' }}
            />
          </li>
        ))}
//[pause]
      </ul>
//[pause]
    </div>
  );
//[pause]
}
//[pause]
export default Home;

```
### `Installations`
```
npm install axios
```
### `project/.env`
```
REACT_APP_TMDB_ACCESS_TOKEN=Token
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
