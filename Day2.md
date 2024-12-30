#### `src/App.js`

```js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Page components
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
```


#### `src/pages/Home.js`

```js
import React from 'react';

function Home() {
  return <h2>Home Page</h2>;
}

export default Home;
```
Similarly, create `MovieDetails.js`, `Search.js`, and `Watchlist.js` with simple placeholders.
