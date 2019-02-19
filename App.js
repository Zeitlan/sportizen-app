import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import ConnectionView from './src/components/connection'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ConnectionView/>
      </View>
    );
  }
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});