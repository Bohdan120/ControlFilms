import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MovieListScreen from './components/MovieListScreen';

const App = () => {
  return (
    <PaperProvider>
      <MovieListScreen />
    </PaperProvider>
  );
};

export default App;