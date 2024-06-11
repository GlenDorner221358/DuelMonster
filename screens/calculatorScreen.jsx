import { StyleSheet, View, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { editCompetitionById, getNewDuelId } from '../services/DbService';

const CalculatorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { player1name, player2name } = route.params;

    const [player1LifePoints, setPlayer1LifePoints] = useState(8000);
    const [player2LifePoints, setPlayer2LifePoints] = useState(8000);

    const [duelId, setDuelId] = useState("");

    const handleDuelCancel = async () => {
        const items = { 
            winner: "DNF",
        };
        const success = await editCompetitionById(duelId, items);
        if(success){
            navigation.navigate("competitions");
        } else {
            console.error("Failed to end the duel");
        }
    };

    const handleDuelOver = async (winner) => {
        const items = { 
            winner: winner,
        };
        const success = await editCompetitionById(duelId, items);
        if(success){
            navigation.navigate("CompetitionsScreen");
        } else {
            console.error("Failed to end the duel");
        }
    };

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

    //to get the duels id
    const handleGettingOfData = async () => {
        try {
            const GottenDuelId = await getNewDuelId();
            setDuelId(GottenDuelId);
            console.log('Duel Id', duelId); // Logging the received data
        } catch (error) {
            console.error('My mind is blown at how this doesnt work', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
            };
        }, [])
    );

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
                        <Button title="-50" onPress={() => updateLifePoints(1, -50)} />
                        <Button title="-100" onPress={() => updateLifePoints(1, -100)} />
                        <Button title="-500" onPress={() => updateLifePoints(1, -500)} />
                        <Button title="-1000" onPress={() => updateLifePoints(1, -1000)} />
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
                        <Button title="-50" onPress={() => updateLifePoints(2, -50)} />
                        <Button title="-100" onPress={() => updateLifePoints(2, -100)} />
                        <Button title="-500" onPress={() => updateLifePoints(2, -500)} />
                        <Button title="-1000" onPress={() => updateLifePoints(2, -1000)} />
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
