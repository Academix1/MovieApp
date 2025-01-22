#### `src/styles/theme.js`

```js
import { createTheme } from '@mui/material/styles';
//[pause]
const theme = createTheme({
  //[pause]
  palette: {
    mode: 'dark',
    //[pause]
    primary: {
      main: '#e50914', // Netflix-like red
    },
    //[pause]
    background: {
      //[pause]
      default: '#141414',
      //[pause]
      paper: '#1f1f1f',
    },
  },
  //[pause]
  typography: {
    //[pause]
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    //[pause]
  },
});
//[pause]
export default theme;
```


#### `src/components/Navbar.js`

```js
//[pause]
import React from 'react';
//[pause]
import { AppBar, Toolbar, Typography } from '@mui/material';
//[pause]
function Navbar() {
return (
//[pause]
   <AppBar position="fixed">
//[pause]
      <Toolbar>
//[pause]
        <Typography variant="h6" component="div">
          Movie App
        </Typography>
//[pause]
      </Toolbar>
//[pause]
    </AppBar>
//[pause]
  );
}
//[pause]
export default Navbar;
```


#### `src/App.js (main)`

```js
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/NavBar';
import Home from './pages/Home';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
   
        <Navbar />
        <Box sx={{ mt: 8 }}>
          <Home/>
        </Box>
    
    </ThemeProvider>
  );
}

export default App;
```
---
### `Installations`

```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

