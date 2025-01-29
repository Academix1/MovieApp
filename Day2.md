### Component Composition

#### `src/pages/Home.tsx`

```js
function Home() {
  return <h2>Home Page</h2>;
}
export default Home;
```

#### `src/App.tsx`

```js
import Home from './pages/Home';

function App() {
  return (
    <Home/>
  );
}

export default App;

```


