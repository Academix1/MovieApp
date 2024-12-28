### **12-Day Roadmap to Build the Movie App Tutorial**


### **Day 1: Introduction and Project Setup**
1. **Introduce the Project:**
   - Explain the purpose of the Movie App (discover and track movies).
   - Discuss tools and technologies used: React, Material-UI (MUI), Redux, TMDB API, etc.

2. **Project Initialization:**
   - Create a React app:
     ```bash
     npx create-react-app movie-app
     cd movie-app
     ```
   - Install dependencies:
     ```bash
     npm install @mui/material @emotion/react @emotion/styled react-router-dom redux @reduxjs/toolkit axios dotenv
     ```

3. **Folder Structure:**
   - Set up the following folder structure:
     ```
     src/
     ├── components/
     ├── pages/
     ├── redux/
     ├── styles/
     ├── utils/
     └── App.js
     ```
   - Add `public/index.html` for basic project metadata (already provided).

---

### **Day 2: Basic React App and Theme Setup**
1. **Create Theme:**
   - Introduce the importance of theming using `ThemeProvider`.
   - Implement a dark theme (`src/styles/theme.js` provided).

2. **Set Up `App.js`:**
   - Wrap the app with `ThemeProvider`, `CssBaseline`, and `Provider` for Redux (use provided `src/App.js`).

3. **Test Theme with a Simple Box:**
   ```javascript
   import { Box } from '@mui/material';

   function App() {
     return (
       <Box sx={{ color: 'primary.main', p: 2 }}>
         Welcome to Movie App!
       </Box>
     );
   }
   ```

---

### **Day 3: TMDB API Integration**
1. **Set Up API Access:**
   - Add `src/utils/api.js` for making TMDB API requests.

2. **Fetch Popular Movies:**
   - Test the API integration in `App.js`:
     ```javascript
     import { useEffect, useState } from 'react';
     import { getPopularMovies } from './utils/api';

     function App() {
       const [movies, setMovies] = useState([]);

       useEffect(() => {
         getPopularMovies().then((response) => setMovies(response.data.results));
       }, []);

       return <div>{movies.map((movie) => <div key={movie.id}>{movie.title}</div>)}</div>;
     }
     ```

---

### **Day 4: Routing with React Router**
1. **Install and Configure Routing:**
   ```bash
   npm install react-router-dom
   ```
   - Add routes for `Home`, `MovieDetails`, `Search`, and `Watchlist`.

2. **Set Up Navigation:**
   - Introduce `src/components/Navbar.js` to create a navigation bar.

---

### **Day 5: Material-UI Basics**
1. **Use `Box` for Layout:**
   - Demonstrate MUI’s `Box` with inline `sx` styling for responsive layouts.

2. **Create `Grid` for Layouts:**
   - Explain the 12-column grid system.
   - Display movie cards in a grid using MUI’s `Grid` (code from `src/pages/Home.js`).

---

### **Day 6: Build and Style the MovieCard Component**
1. **Create `MovieCard.js`:**
   - Add Material-UI’s `Card` to display movie posters, titles, and overviews.

2. **Integrate with the Home Page:**
   - Replace placeholder content with a grid of `MovieCard` components.

---

### **Day 7: Redux Setup and Watchlist Feature**
1. **Add Redux Store:**
   - Use `@reduxjs/toolkit` to manage app state.
   - Add `src/redux/movieSlice.js` to handle watchlist logic.

2. **Watchlist Buttons:**
   - Update `MovieCard.js` to include an "Add to Watchlist" button.

---

### **Day 8: Genre Drawer**
1. **Fetch and Display Genres:**
   - Add `GenreDrawer.js` for a list of genres fetched from the TMDB API.

2. **Filter Movies by Genre:**
   - Dispatch `fetchMoviesByGenre` when a genre is selected.

---

### **Day 9: Search Functionality**
1. **Create `Search.js`:**
   - Use query parameters to search for movies.

2. **Integrate Search Bar:**
   - Update `Navbar.js` with a search input field.

---

### **Day 10: Movie Details Page**
1. **Create `MovieDetails.js`:**
   - Fetch movie details and cast information.
   - Use MUI components (`Typography`, `Chip`, `Rating`, etc.) for styling.

2. **Add Watchlist Button:**
   - Allow users to add/remove the movie to/from their watchlist.

---

### **Day 11: Final UI Improvements**
1. **Responsive Design:**
   - Test and tweak layouts for mobile using MUI breakpoints.

2. **Add Loading States:**
   - Use `Loading.js` for skeleton loading placeholders.

---

### **Day 12: Testing and Deployment**
1. **Test App:**
   - Verify all functionalities, including:
     - Popular and trending movies.
     - Genre-based filtering.
     - Search and watchlist management.

2. **Deploy App:**
   - Host using Netlify, Vercel, or Firebase Hosting.
   - Provide deployment steps.

---
