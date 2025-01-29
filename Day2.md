### Component Composition

#### `src/pages/Home.js`

```js
function Home() {
  return <h2>Home Page</h2>;
}
export default Home;
```

#### `src/App.js`

```js
import Home from './pages/Home';

function App() {
  return (
    <Home/>
  );
}

export default App;

```


