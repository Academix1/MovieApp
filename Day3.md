#### `src/styles/theme.ts(Typing Simulator)`

```js
import { createTheme } from '@mui/material/styles'; //[pause]

const theme = createTheme({ //[pause]
  palette: { //[pause]
    mode: 'dark', // Sets the theme to dark mode //[pause]
    primary: { //[pause]
      main: '#e50914', // Netflix-like red as the primary color //[pause]
    }, //[pause]
    background: { //[pause]
      default: '#141414', // Background color for the whole app //[pause]
      paper: '#1f1f1f', // Background color for components like cards //[pause]
    }, //[pause]
  }, //[pause]
  typography: { //[pause]
    fontFamily: [ //[pause]
      'Roboto', // Primary font //[pause]
      '"Helvetica Neue"', //[pause]
      'Arial', //[pause]
      'sans-serif', //[pause]
    ].join(','), // Joins the font array into a single string //[pause]
  }, //[pause]
}); //[pause]

export default theme; //[pause]
```


#### `src/components/Navbar.tsx  (Typing Simulator)`

```tsx
import { AppBar, Toolbar, Typography } from '@mui/material'; //[pause]

function Navbar() { //[pause]
  return ( //[pause]
    <AppBar position="fixed"> //[pause]
      <Toolbar> //[pause]
        <Typography variant="h6" component="div"> //[pause]
          Movie App //[pause]
        </Typography> //[pause]
      </Toolbar> //[pause]
    </AppBar> //[pause]
  ); //[pause]
} //[pause]

export default Navbar; //[pause]
```

#### `src/App.tsx (Manual Code)`

```tsx
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/NavBar';

<ThemeProvider theme={theme}>
      <CssBaseline />
   
        <Navbar />
        <Box sx={{ mt: 8 }}>
          {/* Call Home Here */}
        </Box>
    
    </ThemeProvider> 
```

---
### `Installations`

```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

