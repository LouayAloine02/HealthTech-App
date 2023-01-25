/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AuthNavigator from './navigations/AuthNavigator';





export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
    <AuthNavigator/>
  </NavigationContainer>
  );




}



