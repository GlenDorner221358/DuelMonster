import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'

function RegisterScreen( {navigation} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  )
}

export default RegisterScreen


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