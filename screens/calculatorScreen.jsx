import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
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
            <View style={styles.calculator}>
                <Text style={styles.playerName}>{player1name}</Text>
                <Text style={styles.lifePoints}>{player1LifePoints}</Text>
                <View style={styles.buttonsContainer}>
                    <Button title="+50" onPress={() => updateLifePoints(1, 50)} />
                    <Button title="+100" onPress={() => updateLifePoints(1, 100)} />
                    <Button title="+500" onPress={() => updateLifePoints(1, 500)} />
                    <Button title="+1000" onPress={() => updateLifePoints(1, 1000)} />
                    <Button title="-50" onPress={() => updateLifePoints(1, -50)} />
                    <Button title="-100" onPress={() => updateLifePoints(1, -100)} />
                    <Button title="-500" onPress={() => updateLifePoints(1, -500)} />
                    <Button title="-1000" onPress={() => updateLifePoints(1, -1000)} />

                </View>
            </View>
            <View style={styles.calculator}>
                <Text style={styles.playerName}>{player2name}</Text>
                <Text style={styles.lifePoints}>{player2LifePoints}</Text>
                <View style={styles.buttonsContainer}>
                    <Button title="+50" onPress={() => updateLifePoints(1, 50)} />
                    <Button title="+100" onPress={() => updateLifePoints(1, 100)} />
                    <Button title="+500" onPress={() => updateLifePoints(1, 500)} />
                    <Button title="+1000" onPress={() => updateLifePoints(1, 1000)} />
                    <Button title="-50" onPress={() => updateLifePoints(1, -50)} />
                    <Button title="-100" onPress={() => updateLifePoints(1, -100)} />
                    <Button title="-500" onPress={() => updateLifePoints(1, -500)} />
                    <Button title="-1000" onPress={() => updateLifePoints(1, -1000)} />
                </View>
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={handleDuelCancel}>
                <Text style={styles.cancelButtonText}>Cancel Duel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#01172f',
        padding: 25,
        paddingTop: 60,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    loginPanel: {
        backgroundColor: '#DBE4EE',
        padding: 10,
        width: 275,
        borderRadius: 9,
        alignItems: 'center',
        height: 330,
    },
    textInput: {
        width: '100%',
        backgroundColor: 'white',
        padding: 5,
        height: 40,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderColor: 'gray',
        borderWidth: 1,
    },
    Bertram: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#D1AC00',
        borderRadius: 5,
        padding: 5,
    },
    Lawrence: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 20,
        width: '100%',
    },
    Clarence: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderBottomWidth: 0,
        width: 90,
        backgroundColor: 'aliceblue',
        fontWeight: '500',
    },
    RegisterLink: {
        marginTop: 10,
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 70,
        borderRadius: 5,
        marginBottom: 20,
    },
    calculator: {
        marginBottom: 20,
        alignItems: 'center',
    },
    playerName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lifePoints: {
        fontSize: 30,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    },
    cancelButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
