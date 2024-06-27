// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Importar la base de datos
import { getAuth } from 'firebase/auth'; // Importar la autenticación
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCb28VneNDZdu1Hv17hQR9OuZQ2GQEa-Yg',
  authDomain: 'gestion-gastos-98a94.firebaseapp.com',
  projectId: 'gestion-gastos-98a94',
  storageBucket: 'gestion-gastos-98a94.appspot.com',
  messagingSenderId: '1025807998990',
  appId: '1:1025807998990:web:31c0bed5753cacc5351c5f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth }; // Para acceder a la base de datos y a la autenticación desde cualquier parte del codigo
