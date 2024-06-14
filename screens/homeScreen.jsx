import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getUserDataByEmail, getAllUsersByWins } from '../services/DbService';

function HomeScreen({ navigation }) {

  // The current user's data
  const [userData, setUserData] = useState('');
  const [topUsers, setTopUsers] = useState([]);

  const handleGettingOfData = async () => {
    try {
      const data = await getUserDataByEmail();
      console.log('Received username: ', data.name); // Logging the received data
      setUserData(data);

      const users = await getAllUsersByWins();
      setTopUsers(users.slice(0, 3)); // Get top 3 users
    } catch (error) {
      console.error('Error fetching user:', error);
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
        {/* WELCOME PANEL */}
        <View style={{ backgroundColor: '#D1AC00', marginBottom: 20, padding: 15, borderRadius: 10, marginTop: 50 }}>
          <Text style={styles.title}>Welcome {userData.name}</Text>
        </View>

        {/* YOUR WINS PANEL */}
        <View style={styles.yourWinsPanel}>
          <Text style={{color: "white", fontSize: 21, fontWeight: "bold"}}> Your wins</Text>
          <Text style={{color: "#D1AC00", fontSize: 25, fontWeight: "bold"}}> {userData.wins} </Text>
        </View>

        {/* LEADERBOARD PANEL */}
        <View style={styles.leaderboard}>
          {topUsers.length > 0 ? (
            <>
              <View style={styles.leaderboardPlace2}>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "gray"}}>
                  2nd
                </Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "gray"}}>{topUsers[1]?.name || 'N/A'}</Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "gray"}}>{topUsers[1]?.wins || '0'} wins</Text>
              </View>

              <View style={styles.leaderboardPlace}>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>
                  1st
                </Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{topUsers[0]?.name || 'N/A'}</Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{topUsers[0]?.wins || '0'} wins</Text>
              </View>

              <View style={styles.leaderboardPlace3}>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "black"}}>
                  3rd
                </Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "black"}}>{topUsers[2]?.name || 'N/A'}</Text>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "black"}}>{topUsers[2]?.wins || '0'} wins</Text>
              </View>
            </>
          ) : (
            <Text>Loading leaderboard...</Text>
          )}
        </View>

        <View style={{flex: 1}}></View>

        {/* BOTTOM PANEL */}
        <View style={{ backgroundColor: '#DBE4EE', padding: 20, borderRadius: 10, gap: 15, flexDirection: 'row' }}>
          {/* Navigate to competitions page */}
          <View style={styles.Bertram}>
            <Pressable style={{ alignItems: 'center' }} onPress={() => navigation.navigate('competitions')}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> Competitions </Text>
            </Pressable>
          </View>

          {/* Sign Out button */}
          <View style={styles.Bertram}>
            <Pressable style={{ alignItems: 'center' }} onPress={handleLogout}>
              <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}> Sign Out </Text>
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
    backgroundColor: '#01172F'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // color: 'white',
    color: '#DBE4EE',
  },
  Bertram: {
    width: 150,
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  CoolMonster: {
    flex: 1,
    height: 360,
    width: 335,
    marginBottom: 150,
    marginTop: 150
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: "center",
    justifyContent: "center",
    width: 338,
  },
  yourWinsPanel: {
    flex: 1,
    maxHeight: 100,
    width: 150,
    padding: 15,
    backgroundColor: "#01172f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  leaderboard: {
    marginTop: 35,
    flex: 1,
    backgroundColor: "red",
    width: 300,
    borderRadius: 5,
    backgroundColor: "#01172f",
    flexDirection: "row"
  },
  leaderboardPlace: {
    flex: 1,
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    margin: 5,
    alignItems: "center"
  },
  leaderboardPlace2: {
    flex: 1,
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    margin: 5,
    marginTop: 35,
    alignItems: "center"
  },
  leaderboardPlace3: {
    flex: 1,
    backgroundColor: '#D1AC00',
    borderRadius: 5,
    margin: 5,
    marginTop: 65,
    alignItems: "center"
  }
});
