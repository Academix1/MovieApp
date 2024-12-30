#### `src/styles/theme.js`

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // Netflix-like red
    },
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
```


#### `src/components/Navbar.js`

```js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          Movie App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
```


#### Updated `src/App.js`

```js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box sx={{ mt: 8 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

Run the app and notice the dark theme with the red `AppBar`.

---
