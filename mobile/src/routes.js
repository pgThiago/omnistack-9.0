import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Book" component={Book} />
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default Routes;