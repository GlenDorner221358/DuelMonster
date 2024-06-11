import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { handleLogin } from '../services/DbService';

function LoginScreen( {navigation} ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Login Function
  const login = () => { handleLogin(email, password) }

  return (
    
      <View style={styles.container}>
        <ImageBackground 
          source={require('../assets/background1.png')} 
          style={styles.backgroundImage}
        >

        <Image 
          style={styles.logo}
          source={require('../assets/logoTitle.png')}
        />

        <View style={styles.loginPanel}>
          <Text style={styles.title}>Log In</Text>

          <View style={styles.Lawrence}>
            <Text style={styles.Clarence}> Email: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Kaiba@KaibaCorp.co.za"
              onChangeText={newText => setEmail(newText)}
              defaultValue={email}
            />
          </View>

          <View style={styles.Lawrence}>
            <Text style={styles.Clarence}> Password: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="BlueEyesWhiteDragon"
              onChangeText={newText => setPassword(newText)}
              defaultValue={password}
              secureTextEntry={true}
            />
          </View>

          {/* Login button */}
          <View style={styles.Bertram}>
            <Pressable style={{alignItems: "center"}} onPress={login}>
              <Text style={{color: "white", fontSize: 21}}> Log-In </Text>
            </Pressable>
          </View>
        </View>

      {/* Register navigation button */}
        <View>
          <Pressable style={styles.RegisterLink} onPress={() => navigation.navigate('register')}>
              <Text style={{color: "white", fontSize: 15}}> Don't have an account? </Text>
              <Text style={{color: "#D1AC00", fontSize: 15}}> Register Here </Text>
          </Pressable>
        </View>

      </ImageBackground>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: "center",
    justifyContent: "center",
    width: 338
  },
  container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#01172f",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#01172f",
  },
  loginPanel: {
    backgroundColor: "#DBE4EE",
    padding: 15,
    width: 275,
    borderRadius: 9,
    alignItems: "center",
    height: 330
  },
  textInput: {
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    height: 40,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderColor: "gray",
    borderWidth: 1
  },
  Bertram: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#D1AC00",
    borderRadius: 5,
    padding: 5
  },
  Lawrence: {
    flexDirection: "column",
    marginBottom: 10,
    marginTop: 20,
    width: "100%",
  },
  Clarence: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderBottomWidth: 0,
    width: 90,
    backgroundColor: "aliceblue",
    fontWeight: "500"
  },
  RegisterLink: {
    marginTop: 10,
    alignItems: 'center'
  },
  logo: {
    width: 220,
    height: 70,
    borderRadius: 5,
    marginBottom: 20
  }
})