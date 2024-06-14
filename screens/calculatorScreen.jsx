// IMPORTS
import { StyleSheet, View, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editCompetitionById, getNewDuelId, getUserData, updateUserData } from '../services/DbService';


const CalculatorScreen = () => {
    // GET DATA FROM PREVIOS SCREEN
    const navigation = useNavigation();
    const route = useRoute();
    const { player1name, player2name, oldID } = route.params;

    // SET DATA WE GOT
    const [player1LifePoints, setPlayer1LifePoints] = useState(8000);
    const [player2LifePoints, setPlayer2LifePoints] = useState(8000);
    const [duelId, setDuelId] = useState(oldID || "");

    // SET THE DUEL ID SO WE CAN COMMUNICATE WITH FIRESTORE
    useEffect(() => {
        const initializeDuelId = async () => {
            if (!oldID) {
                const newDuelId = await getNewDuelId();
                setDuelId(newDuelId);
                console.log('New Duel Id', newDuelId);
            } else {
                console.log('Old Duel Id', oldID);
            }
        };

        initializeDuelId();
    }, [oldID]);

    // SETS THE DUEL WINNER TO UNDECIDED AND TAKES YOU BACK TO THE COMPETITIONS SCREEN
    const handleDuelCancel = async () => {
        const items = { 
            winner: "",
        };
        const success = await editCompetitionById(duelId, items);
        if(success){
            navigation.navigate("competitions");
        } else {
            console.error("Failed to cancel the duel");
        }
    };

    // WHEN EITHER PLAYERS LP HITS 0 THE DUEL IS ENDED
    // THE DUEL'S WIN VALUE IS SET TO THE USERNAME OF THE WINNER
    // AND THE WINNER'S WINS GETS +1'ED
    const handleDuelOver = async (winner) => {
        try {
            // Update competition data with the winner
            const items = { winner: winner };
            const success = await editCompetitionById(duelId, items);
    
            if (success) {
                // Get the winner's user data by username
                const userData = await getUserData(winner);
                if (userData) {
                    const currentWins = userData.wins || 0;
                    const newWins = currentWins + 1;
    
                    // Update the winner's wins in Firestore
                    await updateUserData(winner, { wins: newWins });
                } else {
                    console.log("Winner is not a registered user, skipping user data update.");
                }
    
                // Navigate to the competitions screen
                navigation.navigate("competitions");
            } else {
                console.error("Failed to end the duel");
            }
        } catch (error) {
            console.error("Error handling duel over:", error);
        }
    };

    //GLORIFIED CALCULATOR
    const updateLifePoints = (player, amount) => {
        if (player === 1) {
            const newLifePoints = player1LifePoints + amount;
            setPlayer1LifePoints(newLifePoints);
            if (newLifePoints <= 0) handleDuelOver(player2name);
        } else {
            const newLifePoints = player2LifePoints + amount;
            setPlayer2LifePoints(newLifePoints);
            if (newLifePoints <= 0) handleDuelOver(player1name);
        }
    };


    // WHAT IS DISPLAYED
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require("../assets/DuelBackground.jpg")} 
            >
                <View style={styles.calculator}>
                    <View style={{paddingLeft: 15, paddingRight: 15, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#01172f', alignItems: "center", marginTop: 10}}>
                        <Text style={styles.playerName}>{player1name}</Text>
                    </View>

                    <Text style={styles.lifePoints}>{player1LifePoints}</Text>

                    <View style={styles.buttonsContainer1}>
                        <Button title="+50" onPress={() => updateLifePoints(1, 50)} />
                        <Button title="+100" onPress={() => updateLifePoints(1, 100)} />
                        <Button title="+500" onPress={() => updateLifePoints(1, 500)} />
                        <Button title="+1000" onPress={() => updateLifePoints(1, 1000)} />
                    </View>

                    <View style={styles.buttonsContainer1}>
                        <Button title="-50" onPress={() => updateLifePoints(1, -50)} style={{color: 'red',}}/>
                        <Button title="-100" onPress={() => updateLifePoints(1, -100)} style={{color: 'red',}}/>
                        <Button title="-500" onPress={() => updateLifePoints(1, -500)} style={{color: 'red',}}/>
                        <Button title="-1000" onPress={() => updateLifePoints(1, -1000)} style={{color: 'red',}}/>
                    </View>
                </View>

                <View style={styles.calculator}>
                    <View style={{paddingLeft: 15, paddingRight: 15, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#01172f', alignItems: "center", marginTop: 10}}>
                        <Text style={styles.playerName}>{player2name}</Text>
                    </View>

                    <Text style={styles.lifePoints}>{player2LifePoints}</Text>

                    <View style={styles.buttonsContainer2}>
                        <Button title="+50" onPress={() => updateLifePoints(2, 50)} />
                        <Button title="+100" onPress={() => updateLifePoints(2, 100)} />
                        <Button title="+500" onPress={() => updateLifePoints(2, 500)} />
                        <Button title="+1000" onPress={() => updateLifePoints(2, 1000)} />
                    </View>

                    <View style={styles.buttonsContainer2}>
                        <Button title="-50" onPress={() => updateLifePoints(2, -50)} style={{color: 'red',}}/>
                        <Button title="-100" onPress={() => updateLifePoints(2, -100)} style={{color: 'red',}}/>
                        <Button title="-500" onPress={() => updateLifePoints(2, -500)} style={{color: 'red',}}/>
                        <Button title="-1000" onPress={() => updateLifePoints(2, -1000)} style={{color: 'red',}}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={handleDuelCancel}>
                    <Text style={styles.cancelButtonText}>CANCEL DUEL</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#01172f',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    calculator: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: "#DBE4EE",
        flex: 1,
        width: 300,
        borderRadius: 15
    },
    playerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#D1AC00",
    },
    lifePoints: {
        fontSize: 30,
        marginBottom: 10,
        fontStyle: "italic",
        fontWeight: "600",
    },
    buttonsContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        padding: 15,
        backgroundColor: "#85ABCE"
    },
    buttonsContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        padding: 15,
        backgroundColor: "#593F52"
    },
    cancelButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        width: 250,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "600",
        fontStyle: "italic"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: "center",
        justifyContent: "center",
        width: 338,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 60,
        paddingBottom: 50
    }
});