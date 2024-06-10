import { StyleSheet, View, Text, Pressable, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAllCompetitions } from '../services/DbService';

function CompetitionsScreen({ navigation }) {

    const [allComps, setAllComps] = useState([]);

    const handleGettingOfData = async () => {
        const allData = await getAllCompetitions();
        console.log("Received competitions data:", allData); // Logging the received data
        setAllComps(allData);
    };

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                // Cleanup if necessary
            };
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.singleCompPanel}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: 250, height: "auto" }}>
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
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold", textAlign: "center" }}> View </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Competitions Screen</Text>

            <View style={styles.Bertram}>
                <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate('home')}>
                    <Text style={{ color: "white", fontSize: 21 }}> Home </Text>
                </Pressable>
            </View>

            <View style={styles.Bertram}>
                <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate('newDuel')}>
                    <Text style={{ color: "white", fontSize: 21 }}> New Duel </Text>
                </Pressable>
            </View>

            <FlatList
                style={styles.flatlist}
                data={allComps}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}

export default CompetitionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#01172f",
        paddingLeft: 25,
        paddingRight: 25,
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
        marginBottom: 30,
        backgroundColor: "#DBE4EE",
        padding: 10,
        width: 290,
        borderRadius: 9,
        alignItems: "center",
        height: "auto",
        justifyContent: "center"
    },
    Bertram: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#D1AC00",
        borderRadius: 5,
        padding: 5
    },
    vs: {
        marginLeft: 15,
        marginRight: 15,
        fontWeight: '700',
        fontSize: 20,
        fontStyle: "italic"
    },
    flatlist: {
        marginTop: 25
    },
    flatListContent: {
        alignItems: 'center',
        justifyContent: "center"
    }
});
