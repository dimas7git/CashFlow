import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpensePage from './expense/ExpensePage'; 
import RevenuePage from './revenue/RevenuePage'; 
import HomePage from './home/HomePage'; 
import InspectPage from './home/InspectPage';
import InspectPageMonth from './home/InspectPageMonth';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ExpensePage" component={ExpensePage} />
        <Stack.Screen name="RevenuePage" component={RevenuePage} />
        <Stack.Screen name="InspectPage" component={InspectPage} />
        <Stack.Screen name="InspectPageMonth" component={InspectPageMonth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
