
## `Axios,UseState and Use Effect`

### `Installations`
```
npm install axios
```

### `project/.env`
```
VITE_TMDB_API_KEY=Token
```

### Home.tsx
```Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
          const apiKey = import.meta.env.VITE_TMDB_API_KEY;
          if (!apiKey) {
            setError("API Key is missing.");
            setLoading(false);
            return;
          }
      
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
          );
      
          setMovies(data.results);
        } catch (error) {
          setError("Failed to fetch movies");
        } finally {
          setLoading(false);
        }
      };
    fetchMovies();
  }, []);

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
```
