// IMPORTS
import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createNewCompetition, getUserName } from '../services/DbService'; // Import getUserName from the correct path

const NewDuelScreen = ({ navigation }) => {
    
    // LITERALLY ALL OF THE DATA WE NEED TO GET/SET WHEN MAKING A NEW DUEL
    const [player1name, setPlayer1name] = useState('');
    const [player2name, setPlayer2name] = useState('');
    const [date, setDate] = useState(null); // Firestore timestamp format
    const [password, setPassword] = useState('');
    const [winner, setWinner] = useState('');

    // HANDLES MAKING A NEW DUEL
    const handleCreation = async () => {
        // If player2name is empty, set it to default
        const player2NameToUse = player2name.trim() ? player2name : 'Looking for player 2...';

        // Set date to the current timestamp
        const timestamp = date || new Date().toISOString();

        // Determine the open state based on player2name
        const openState = !player2name.trim();

        // Pass all our data to the function
        const items = {
            player1name,
            player2name: player2NameToUse, 
            date: timestamp, 
            open: openState,  
            password,
            winner,
        };
        
        const success = await createNewCompetition(items);
        if (success) {
            if (player2NameToUse === 'Looking for player 2...') {
                navigation.navigate('competitions');
            } else {
                navigation.navigate('calculator', { player1name, player2name: player2NameToUse });
            }
        } else {
            console.error('Failed to create a new duel.');
        }
    };

    // SETS PLAYER 1 NAME = LOGGED USERS USERNAME
    const handleGettingOfData = async () => {
        try {
            const name = await getUserName();
            console.log('Received username: ', name); // Logging the received data
            setPlayer1name(name);
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    // CALLS THE FUNCTION ABOVE
    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                // Cleanup if necessary
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Duel</Text>

            {/* Navigate to competitions page */}
            <View style={styles.Bertram}>
                <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate('competitions')}>
                    <Text style={{ color: "white", fontSize: 21 }}>Cancel</Text>
                </Pressable>
            </View>

            <View style={styles.loginPanel}>
                {/* player 1 */}
                <Text> {player1name} </Text>

                <Text> VS </Text>

                {/* player 2 */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Player 2 name"
                    onChangeText={newText => setPlayer2name(newText)}
                    defaultValue={player2name}
                />

                {/* password */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={newText => setPassword(newText)}
                    defaultValue={password}
                />

                <TouchableOpacity style={styles.Bertram} onPress={handleCreation}>
                    <Text style={{ color: "white", fontSize: 21, textAlign: "center" }}>Create new duel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NewDuelScreen

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
    loginPanel: {
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
        borderWidth: 1,
        margin: 5
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
    },
    switch: {
        display: 'flex',    
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: 275,
        justifyContent: "center"
    }
})