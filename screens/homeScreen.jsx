import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getUserName } from '../services/DbService';

function HomeScreen({ navigation }) {

  // Getting the currently logged user's name
  const [userName, setUserName] = useState('');

  const handleGettingOfData = async () => {
    try {
      const name = await getUserName();
      console.log('Received username: ', name); // Logging the received data
      setUserName(name);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGettingOfData();
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );


  // Sign out function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User has been signed out');
      })
      .catch((error) => {
        // An error happened.
        console.error('The following error occurred:', error.code, error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.title}>{userName}</Text>

      {/* Navigate to competitions page */}
      <View style={styles.Bertram}>
        <Pressable style={{ alignItems: 'center' }} onPress={() => navigation.navigate('competitions')}>
          <Text style={{ color: 'white', fontSize: 21 }}> Competitions </Text>
        </Pressable>
      </View>

      {/* Sign Out button */}
      <View style={styles.Bertram}>
        <Pressable style={{ alignItems: 'center' }} onPress={handleLogout}>
          <Text style={{ color: 'white', fontSize: 21 }}> Sign Out </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#01172f',
    padding: 25,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  loginPanel: {
    backgroundColor: '#DBE4EE',
    padding: 10,
    width: 275,
    borderRadius: 9,
    alignItems: 'center',
    height: 330,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 5,
    height: 40,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderColor: 'gray',
    borderWidth: 1,
  },
  Bertram: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    padding: 5,
  },
  Lawrence: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
  },
  Clarence: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderBottomWidth: 0,
    width: 90,
    backgroundColor: 'aliceblue',
    fontWeight: '500',
  },
  RegisterLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 70,
    borderRadius: 5,
    marginBottom: 20,
  },
});
