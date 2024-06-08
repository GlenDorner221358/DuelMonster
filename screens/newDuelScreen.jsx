import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, TouchableOpacity, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { createNewCompetition } from '../services/DbService';

const NewDuelScreen = ({navigation}) => {

    const [player1name, setPlayer1name] = useState('')
    const [player2name, setPlayer2name] = useState('')
    const [date, setDate] = useState(null) // Firestore timestamp format
    const [open, setOpen] = useState(false) // Boolean
    // viewAble = firestore 'private' field in the duels db
    const [notViewAble, setNotViewAble] = useState(false) // Boolean
    const [password, setPassword] = useState('')
    const [winner, setWinner] = useState('')
   
    const handleCreation = async () => {
        // Pass all our data to the function
        var items = {
            player1name,
            player2name, 
            date, 
            open: true, 
            notViewAble: false, 
            password: "",
            winner,
        }
        var success = await createNewCompetition(items)
        if(success){
            navigation.goBack()
        } else {
            // todo validation on why
        }
    }

    //to set player1 name equal to the users name
    const handleGettingOfData = async () => {
    try {
        const name = await getUserName();
        console.log('Received username: ', name); // Logging the received data
        setPlayer1name(name);
    } catch (error) {
        console.error('Error fetching username:', error);
    }
    };


  return (
    <View style={styles.container}>

        <Text style={styles.title}>New Duel</Text>

        {/* Navigate to competitions page */}
        <View style={styles.Bertram}>
          <Pressable style={{alignItems: "center"}} onPress={() => navigation.navigate('competitions')}>
            <Text style={{color: "white", fontSize: 21}}> Cancel </Text>
          </Pressable>
        </View>

        <View style={styles.loginPanel}>

            {/* player 1 */}
            <Text> {player1name} </Text>

            {/* player 2 */}
            <TextInput
                style={styles.textInput}
                placeholder="Player 2 name"
                onChangeText={newText => setPlayer2name(newText)}
                defaultValue={player2name}
            />

            {/* date */}
            <TextInput
                style={styles.textInput}
                placeholder="date & time (YYYY-MM-DD HH:MM)"
                onChangeText={newText => {
                    const timestamp = new Date(newText).toISOString();
                    setDate(timestamp);
                }}
                defaultValue={date ? new Date(date).toISOString().slice(0, 16).replace('T', ' ') : ''}
            />

            {/* password */}
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
            />

            {/* winner */}
            <TextInput
                style={styles.textInput}
                placeholder="Winner"
                onChangeText={newText => setWinner(newText)}
                defaultValue={winner}
            />

            {/* private */}
            <View style={styles.switch}>
                <Text>Set to private?</Text>
                <Switch
                    trackColor={{false: 'black', true: 'yellow'}}
                    thumbColor={notViewAble ? 'yellow' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(toggle) => setNotViewAble(toggle)}
                    value={notViewAble}
                />
            </View>

            <TouchableOpacity style={styles.Bertram} onPress={handleCreation}>
                <Text style={{color: "white", fontSize: 21, textAlign: "center"}}>Create new duel</Text>
            </TouchableOpacity>
        
        </View>  

    </View>
  )
}

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