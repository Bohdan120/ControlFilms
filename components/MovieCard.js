import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Button, Paragraph } from 'react-native-paper';

const MovieCard = ({ movie, isFavorite, onAdd, onRemove }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: movie.image }} />
      <Card.Content>
        <Card.Title title={movie.title} />
        <Paragraph>{movie.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {isFavorite ? (
          <Button mode="contained" onPress={() => onRemove(movie.id)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button mode="outlined" onPress={() => onAdd(movie)}>
            Add to Favorites
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default MovieCard;
