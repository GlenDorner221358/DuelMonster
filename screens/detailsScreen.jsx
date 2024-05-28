import { StyleSheet, View, Text, TextInput, Button, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'


function DetailsScreen( {navigation, route} ) {

    const { competitionData } = route.params;

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Details</Text>

        <View style={styles.loginPanel}>

            <View>
                <Text style={{marginBottom: 10}}>
                    {/* {new Date(competitionData.date.toDate()).toLocaleDateString('en-GB')} {new Date(competitionData.date.toDate()).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} */}
                    {competitionData.date}
                </Text>
            </View>

            <View style={{alignItems: "center"}}>
                <Text style={styles.names}>
                    {competitionData.player1name}
                </Text>
                <Text style={styles.vs}>
                    VS
                </Text>
                <Text style={styles.names}>
                    {competitionData.player2name}
                </Text>
            </View>

            <View style={{alignItems: "center", marginTop: 10}}>
                <Text style={{fontWeight: "bold"}}>
                    Winner
                </Text>
                <Text>
                    {competitionData.winner}
                </Text>
            </View>

            <View style={styles.Bertram}>
                <Pressable style={{alignItems: "center"}} disabled={!competitionData.open}>
                    <Text style={{color: "white", fontSize: 21}}> Join </Text>
                </Pressable>
            </View>

        </View>

        {/* Navigate to competitions page */}
        <View style={styles.Bertram}>
          <Pressable style={{alignItems: "center"}} onPress={() => navigation.navigate('competitions')}>
            <Text style={{color: "white", fontSize: 21}}> Back to Competitions </Text>
          </Pressable>
        </View>

    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#01172f",
        padding: 25,
        paddingTop: 60
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
    },
    loginPanel: {
        backgroundColor: "#DBE4EE",
        padding: 10,
        marginTop: 10,
        width: 275,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "auto",
        flexDirection: "column"
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
    },
    names: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    vs: {
        marginLeft: 15,
        marginRight: 15,
        fontWeight: '700',
        fontSize: 20,
        fontStyle: "italic"
    }
})