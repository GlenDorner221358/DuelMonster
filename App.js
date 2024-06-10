import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import HomeScreen from './screens/homeScreen';
import CompetitionsScreen from './screens/competitionsScreen';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import DetailsScreen from './screens/detailsScreen';
import NewDuelScreen from './screens/newDuelScreen';
import CalculatorScreen from './screens/calculatorScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // var currentUser = auth.currentUser
    // console.log("Current User - " + currentUser?.email ?? "none")

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        console.log("User logged in..." + user.email)
      } else {
        setLoggedIn(false)
        console.log("No user logged in :(")
      }
    })
    return unsubscribe
    
  }, [])

  return (
    // Add navigation here
    // ok
    // STACK NAVIGATION
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="competitions" component={CompetitionsScreen} />
            <Stack.Screen name="details" component={DetailsScreen} />
            <Stack.Screen name="newDuel" component={NewDuelScreen} />
            <Stack.Screen name="calculator" component={CalculatorScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

