import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhoto"
import Test from "./components/Test"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Gallery" component={Gallery}
          options={{
            title: 'Your photos',
            headerStyle: {
              backgroundColor: '#EA1E63',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
         <Stack.Screen
          name="CameraScreen" component={CameraScreen}
          options={{
            title: 'Camera',
            headerStyle: {
              backgroundColor: '#EA1E63',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="BigPhoto" component={BigPhoto}
          options={{
            title: 'Photo preview',
            headerStyle: {
              backgroundColor: '#EA1E63',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
