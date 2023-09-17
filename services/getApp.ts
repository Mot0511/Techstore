import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC_zmqr839OpJXOQ3Mm4ZPN6wxvnhGHK4Y",
    authDomain: "techstore-b7ec2.firebaseapp.com",
    projectId: "techstore-b7ec2",
    storageBucket: "techstore-b7ec2.appspot.com",
    messagingSenderId: "848214838919",
    appId: "1:848214838919:web:3d8bf3fc7cd0adc692b222",
    measurementId: "G-TV8RF5Y3DS",
    datebaseURL: 'https://techstore-b7ec2.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app, db}
