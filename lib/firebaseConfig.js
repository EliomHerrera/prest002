import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ee9gyMQG_ylFp-84NMekrlGIaOj8Tl8",
    authDomain: "provando-4b33f.firebaseapp.com",
    projectId: "provando-4b33f",
    storageBucket: "provando-4b33f.appspot.com",
    messagingSenderId: "53272691089",
    appId: "1:53272691089:web:94791b45ca5a3a921d5a30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let tabla = "items"

// Leer
async function readItems() {
    const querySnapshot = await getDocs(collection(db, tabla));

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));
}

// Crear
async function createItem(xData) {
    const docRef = await addDoc(collection(db, tabla), xData);
}

// Editar
async function updateItem(id, xData) {
    const itemRef = doc(db, tabla, id);
    await updateDoc(itemRef, xData);
}

// Eliminar
async function deleteItem(id) {
    await deleteDoc(doc(db, tabla, id));
}

export { readItems, createItem, updateItem, deleteItem }
