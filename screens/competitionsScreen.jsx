import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getAllCompetitions } from '../services/DbService';

function CompetitionsScreen( {navigation} ) {

    const [allComps, setAllComps] = useState([])

    const handleGettingOfData = async () => {
        var allData = await getAllCompetitions()
        console.log("Received competitions data:", allData); // Logging the received data
        setAllComps(allData)
    }

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData()
            return () => {
                // Cleanup if necessary
            };
        }, [])
    )

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Competitions Screen</Text>

        {/* Navigate to home page */}
        <View style={styles.Bertram}>
          <Pressable style={{alignItems: "center"}} onPress={() => navigation.navigate('home')}>
            <Text style={{color: "white", fontSize: 21}}> Home </Text>
          </Pressable>
        </View>

        {/* Navigate to create competition page */}
        <View style={styles.Bertram}>
          <Pressable style={{alignItems: "center"}} onPress={() => navigation.navigate('newDuel')}>
            <Text style={{color: "white", fontSize: 21}}> New Duel </Text>
          </Pressable>
        </View>

        {/* THE LOOP*/}
        {
        allComps.length > 0 ? (
            allComps.map((item, index) => (
                <View key={index} style={styles.singleCompPanel}>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", width: 275, height: "auto"}}>
                        <Text style={styles.names}>
                            {item.player1name}
                        </Text>
                        <Text style={styles.vs}>
                            VS
                        </Text>
                        <Text style={styles.names}>
                            {item.player2name}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.Bertram} onPress={() => navigation.navigate("details", { competitionData: item })}>
                        <Text style={{fontSize: 15, color: "white", fontWeight: "bold", textAlign: "center"}}> View </Text>
                    </TouchableOpacity>

                </View>
            ))
        ): (
            <Text> No Items Found Yet </Text>
        )

        }
        {/* END LOOP */}

    </View>
  )
}

export default CompetitionsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#01172f",
        padding: 25,
        paddingTop: 60
    },
    names: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center"
    },
    singleCompPanel: {
        flexDirection: "column",
        margin: 10,
        marginTop: 20,
        backgroundColor: "#DBE4EE",
        padding: 10,
        width: 290,
        borderRadius: 9,
        alignItems: "center",
        height: "auto",
        justifyContent: "center"
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
        marginTop: 10,
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
    vs: {
        marginLeft: 15,
        marginRight: 15,
        fontWeight: '700',
        fontSize: 20,
        fontStyle: "italic"
    }
})