import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Add navigation here
    // ok
    // TAB NAVIGATION
    // <NavigationContainer>
    //   <Tab.Navigator initialRouteName='home'>
    //     <Tab.Screen name="login" component={LoginScreen} />
    //     <Tab.Screen name="register" component={RegisterScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>

    // STACK NAVIGATION
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

