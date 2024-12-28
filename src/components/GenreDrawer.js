import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
} from '@mui/material';
import { fetchGenres, setSelectedGenre, clearSelectedGenre } from '../redux/movieSlice';
import ClearIcon from '@mui/icons-material/Clear';

const DRAWER_WIDTH = 240;

function GenreDrawer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const genres = useSelector((state) => state.movies.genres);
  const selectedGenre = useSelector((state) => state.movies.selectedGenre);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreClick = (genre) => {
    if (selectedGenre?.id === genre.id) {
      dispatch(clearSelectedGenre());
    } else {
      dispatch(setSelectedGenre(genre));
    }
  };

  const drawer = (
    <>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          Genres
        </Typography>
      </Box>
      <List>
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            disablePadding
            secondaryAction={
              selectedGenre?.id === genre.id && (
                <IconButton 
                  edge="end" 
                  size="small"
                  onClick={() => dispatch(clearSelectedGenre())}
                >
                  <ClearIcon />
                </IconButton>
              )
            }
          >
            <ListItemButton
              selected={selectedGenre?.id === genre.id}
              onClick={() => handleGenreClick(genre)}
            >
              <ListItemText primary={genre.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={false} // This will be controlled by a state in the parent component
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              position: 'relative',
              height: '100vh',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
}

export default GenreDrawer;
