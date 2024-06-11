import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from 'react-native';
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

      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/homeBackground.jpg")}  
      >

      <View style={{ backgroundColor: '#01172f', marginBottom: 20, padding: 15, borderRadius: 10 }}>
        <Text style={styles.title}>Welcome {userName}</Text>
      </View>

      <Image 
        source={require('../assets/blue_eyes.png')}
        style={styles.CoolMonster}
      />
      
      <View style={{ backgroundColor: '#01172f', padding: 20, borderRadius: 10, gap: 15 }}>

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

      </ImageBackground>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#01172f'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // color: 'white',
    color: '#D1AC00',
  },
  Bertram: {
    width: 230,
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    padding: 5,
  },
  CoolMonster: {
    width: 200,
    height: 200,
    marginBottom: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: "center",
    justifyContent: "center",
    width: 338,
    backgroundColor: "red"
  }
});
