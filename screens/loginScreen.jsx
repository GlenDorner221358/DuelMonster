import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'

function LoginScreen( {navigation} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('register')}
      />
    </View>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#151718"
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#ECEDEE"
  }
})