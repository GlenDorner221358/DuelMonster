// IMPORTS
import { StyleSheet, View, Text, Pressable, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAllCompetitions } from '../services/DbService';

function CompetitionsScreen({ navigation }) {
    // CONSTS
    const [allComps, setAllComps] = useState([]);
    const [filteredComps, setFilteredComps] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showAllDuels, setShowAllDuels] = useState(true);

    // STARTUP FUNCTION THAT GETS ALL THE DATA
    const handleGettingOfData = async () => {
        const allData = await getAllCompetitions();
        console.log("Received competitions data:", allData); // Logging the received data
        setAllComps(allData);
        setFilteredComps(allData);
    };

    // CALLING THE STARTUP FUNCTION WHENEVER THE PAGE IS DISPLAYED
    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                // Cleanup if necessary
            };
        }, [])
    );

    // FILTER COMPETITIONS TO ONLY DISPLAY JOINABLE ONES
    const filterCompetitions = () => {
        let filteredData = allComps;

        if (!showAllDuels) {
            filteredData = filteredData.filter(comp => comp.player2name === 'Looking for player 2...');
        }

        if (searchText) {
            filteredData = filteredData.filter(comp =>
                comp.player1name.toLowerCase().includes(searchText.toLowerCase()) ||
                comp.player2name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredComps(filteredData);
    };

    useEffect(() => {
        filterCompetitions();
    }, [searchText, showAllDuels, allComps]);

    // DUEL CARD WHICH IS RE-USED
    const renderItem = ({ item }) => (
        <View style={styles.singleCompPanel}>
            <View style={{ justifyContent: "center", alignItems: "center", width: 250, height: "auto" }}>
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

    // ACTUAL SCREEN
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Duels</Text>

            <View style={styles.searchContainer}>
                <Pressable style={styles.filterButton} onPress={() => setShowAllDuels(!showAllDuels)}>
                    <Text style={styles.filterButtonText}>
                        {showAllDuels ? 'Filter by Open' : 'Show All'}
                    </Text>
                </Pressable>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <FlatList
                style={styles.flatlist}
                data={filteredComps}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
            />

            <View style={{ backgroundColor: '#DBE4EE', padding: 20, borderRadius: 10, gap: 15, flexDirection: 'row', borderTopWidth: 3, borderTopColor: 'black' }}>
                <View style={styles.Bertram}>
                    <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate('home')}>
                        <Text style={{ color: "white", fontSize: 21, fontWeight: 'bold' }}> Home </Text>
                    </Pressable>
                </View>

                <View style={styles.Bertram}>
                    <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate('newDuel')}>
                        <Text style={{ color: "white", fontSize: 21, fontWeight: 'bold' }}> New Duel </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default CompetitionsScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        flex: 1,
        alignItems: "center",
        backgroundColor: "#01172f",
    },
    names: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center",
        marginBottom: 10
    },
    singleCompPanel: {
        flexDirection: "column",
        marginBottom: 20,
        backgroundColor: "#DBE4EE",
        padding: 10,
        width: 260,
        borderRadius: 9,
        alignItems: "center",
        height: "auto",
        justifyContent: "center"
    },
    Bertram: {
        width: 150,
        backgroundColor: "#D1AC00",
        borderRadius: 5,
        padding: 10,
    },
    vs: {
        marginLeft: 15,
        marginRight: 15,
        fontWeight: '700',
        fontSize: 20,
        fontStyle: "italic"
    },
    flatListContent: {
        alignItems: 'center',
        justifyContent: "center"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: "center",
        justifyContent: "center",
        width: 338,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 60
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: "#247BA0",
        padding: 15,
        borderRadius: 5,
        width: "100%",
        gap: 20
    },
    searchInput: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 50,
        color: 'white',
        width: 140
    },
    filterButton: {
        backgroundColor: '#D1AC00',
        padding: 15,
        borderRadius: 5,
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
});
