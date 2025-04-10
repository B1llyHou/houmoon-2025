import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('HoumoonApp', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('HoumoonApp', {
    rootTag: document.getElementById('root')
  });
}
