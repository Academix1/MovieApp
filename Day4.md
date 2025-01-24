
### `src/redux/movieSlice.js`


```js
import { createSlice } from '@reduxjs/toolkit';
//[pause]
const initialState = {
  placeholder: 'Redux is working!',
};
//[pause]
const movieSlice = createSlice({
  //[pause]
  name: 'movies',
  initialState,
  reducers: {
  },

});
//[pause]
export default movieSlice.reducer;
```

### `src/redux/store.js`

```js
import { configureStore } from '@reduxjs/toolkit';
//[pause]
import movieReducer from './movieSlice';
//[pause]
export const store = configureStore({
//[pause]
  reducer: {
    movies: movieReducer,
  },
//[pause]
});
//[pause]
export default store;
```
### `src/pages/Home.js (Type Simulator)`

```javascript
    import React from 'react';
    //[pause]
    import { useSelector } from 'react-redux';
    //[pause]
    function Home() {
    //[pause]
    const select=useSelector(state=>state.movies.placeholder);
      //[pause]
      return <h2>Home Page {select}</h2>;
    }
    
    export default Home;
```     

### `src/App.js (Updated)`

```js
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  return (
    <Provider store={store}>
      //Adding Provider and Configuring Store in it
    </Provider>
  );
}

export default App;
```

### `src/App.js(main)`

```js
    import React from 'react';
    import { ThemeProvider, CssBaseline, Box } from '@mui/material';
    import { Provider } from 'react-redux';
    import theme from './styles/theme';
    import Navbar from './components/NavBar';
    import { store } from './redux/store';
    
    // Pages
    import Home from './pages/Home';
    
    function App() {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Navbar />
              <Box sx={{ mt: 8 }}>
                <Home/>
              </Box>
          </ThemeProvider>
        </Provider>
      );
    }
    
    export default App;
```

---
### `Installations`
```
npm install @reduxjs/toolkit react-redux
```
