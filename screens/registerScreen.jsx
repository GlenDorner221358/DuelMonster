import { StyleSheet, View, Image, Text, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

function RegisterScreen( {navigation} ) {
  return (
    <View style={styles.container}>

      <Image 
        style={styles.logo}
        source={require('../assets/logoTitle.png')}
      />

      <View style={styles.loginPanel}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.Lawrence}>
          <Text style={styles.Clarence}> Name: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Seto"
          />
        </View>

        <View style={styles.Lawrence}>
          <Text style={styles.Clarence}> Email: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Kaiba@KaibaCorp.co.za"
          />
        </View>

        <View style={styles.Lawrence}>
          <Text style={styles.Clarence}> Password: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="BlueEyesWhiteDragon"
          />
        </View>

        <View style={styles.Bertram}>
          <Pressable style={{alignItems: "center"}} onPress={() => navigation.navigate('register')}>
            <Text style={{color: "white", fontSize: 21}}> Create Account </Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Pressable style={styles.RegisterLink} onPress={() => navigation.navigate('login')}>
            <Text style={{color: "white", fontSize: 15}}> Already have an account? </Text>
            <Text style={{color: "#D1AC00", fontSize: 15}}> Log in here </Text>
        </Pressable>
      </View>

    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#01172f",
      padding: 25,
      paddingBottom: 60,
      paddingTop: 30
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: "#01172f",
  },
  loginPanel: {
    backgroundColor: "#DBE4EE",
    flex: 1,
    padding: 10,
    width: 275,
    borderRadius: 9,
    alignItems: "center",
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