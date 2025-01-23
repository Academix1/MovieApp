
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

  // Helper function to get the TMDB Access Token from .env
  const getAccessToken = () => process.env.REACT_APP_TMDB_ACCESS_TOKEN;
//[pause]
  // Fetching popular movies using the access token in the URL
  useEffect(() => {
//[pause]
    const fetchMovies = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setError('API Key is missing');
        setLoading(false);
        return;
      }
//[pause]
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`
        );
//[pause]
        setMovies(response.data.results);
//[pause]
        setLoading(false);

      }
//[pause]
      catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }

    };
//[pause]

    fetchMovies();
  }, []); // Empty dependency array means this effect runs only once, when the component mounts
//[pause]
  // Show loading state while movies are being fetched

if (loading) {
    return <h2>Loading movies...</h2>;
  }
//[pause]
  // Show error message if fetch failed
  if (error) {
    return <h2>{error}</h2>;
  }
//[pause]
  return (
    <div style={{ padding: '20px' }}>
      <h2>Popular Movies</h2>
      <ul>
//[pause]
     {movies.map((movie) => (
//[pause]
<li key={movie.id}>
//[pause]

//[pause]
   <h3>{movie.title}</h3>

//[pause]
         <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px' }}
            />

//[pause]
          </li>

        ))}
      </ul>
    </div>

//[pause]
  );

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
