import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CaixadeEntrada from './Screen/CaixadeEntrada'
import Email from './Screen/Email'

const stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name= 'CaixadeEntrada' component={CaixadeEntrada} options={{headerShown: false}}/>
        <stack.Screen name= 'Email' component={Email} options={{headerShown: false}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}