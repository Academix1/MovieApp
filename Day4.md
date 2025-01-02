<summary><strong>src/redux/movieSlice.js</strong></summary>


```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placeholder: 'Redux is working!',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Add actions here in the future
  },
});

export default movieSlice.reducer;
```

<summary><strong>src/redux/store.js</strong></summary>

```js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
```

<summary><strong>src/App.js (Updated)</strong></summary>

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


---

