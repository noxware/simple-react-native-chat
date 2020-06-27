import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import { NavigationContainer, useTheme as useNavigationTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { Provider as PaperProvider } from 'react-native-paper';

import Home from './screens/Home';
import Room from './screens/Room';

const Stack = createStackNavigator();

export default function App() {
  YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`',
    'Function components cannot be given refs.'
  ]);

  return (
    <PaperProvider>
      <StatusBar barStyle='dark-content' backgroundColor={useNavigationTheme().colors.background} />
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            header: () => undefined
          }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Room' component={Room} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
