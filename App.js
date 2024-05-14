import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Add navigation here
    // ok
    // TAB NAVIGATION
    <NavigationContainer>
      <Tab.Navigator initialRouteName='home'>
        <Tab.Screen name="login" component={LoginScreen} />
        <Tab.Screen name="register" component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

