import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import MovieCard from '../components/MovieCard';

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/movies')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
    showSnackbar(`Added "${movie.title}" to favorites`);
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
    const movie = movies.find((movie) => movie.id === id);
    showSnackbar(`Removed "${movie.title}" from favorites`);
  };

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
  };

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={isFavorite(item.id)}
            onAdd={addToFavorites}
            onRemove={removeFromFavorites}
          />
        )}
      />
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={2000}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MovieListScreen;
