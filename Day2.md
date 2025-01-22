### Component Composition

#### `src/App.js`
#### Manual Code
```js
import Home from './pages/Home';
<Home />
```

#### `src/App.js`

```js
import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <Home/>
  );
}

export default App;
//[ignore] 
```


#### `src/pages/Home.js`(Typing Simulator)

```js
import React from 'react';
//[pause]
function Home() {
//[pause]
  return <h2>Home Page</h2>;
//[pause]
}
//[pause]
export default Home;
```
