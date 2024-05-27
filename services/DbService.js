// TODO: Create Firebase Auth Functions
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, where } from "firebase/firestore";


// FIREBASE ||||||||||

// Login
export const handleLogin = (email, password) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Login from: " + user.email)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    });

}

// Register
export const handleRegister = async (name, email, password) => {
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        console.log("Registered: " + user.email);

        // Firestore creation
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                email: user.email
            });
            console.log("Document written with ID: ", docRef.id);
            return true;
        } catch (e) {
            console.error("Error adding document", e);
            return false;
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        return false;
    }
}


// FIRESTORE ||||||||||

// Create new
// export const createNewCompetition = async (item) => {

//     try {
//         const docRef = await addDoc(collection(db, "items"), item);
//         console.log("Document written with ID: ", docRef.id);
//         return true
//     } catch (e) {
//         console.error("Error adding document", e);
//         return false
//     }

// }

// Get all
// export const getAllCompetitions = async () => {

//     var allItems = []

//     var q = query( collection(db, "items"), orderBy('priority', "asc")
//     // , where("priority", "==", true) 
//     )
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         // console.log(doc.id, " => ", doc.data());

//         allItems.push({... doc.data(), id: doc.id})
//     });

//     console.log(allItems)
//     return allItems
// }