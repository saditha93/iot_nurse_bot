import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Dashboard,
  Control,
  SplashScreen,
  PatientDetails,
} from './src/screens';
import tabs from './src/navigation/tabs';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="#417ffb" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'SplashScreen'}>
        <Stack.Screen name="Home" component={tabs} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home2" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Control" component={Control} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
