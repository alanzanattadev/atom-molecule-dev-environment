import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up "App.js" c est tres fun to start dddd working on your app!</Text>
        <Text>Changes you make wilazkenakzjekla aze aze azel automatically reload.</Text>
        <Text>Shake your phone to open the developzdzdzdzd er menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
