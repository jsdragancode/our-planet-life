import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyAci6YpZwim8zLvndb5EAEBIeepme020LA",
	authDomain: "ourplanet-4ef56.firebaseapp.com",
	projectId: "ourplanet-4ef56",
	storageBucket: "ourplanet-4ef56.appspot.com",
	messagingSenderId: "542203216508",
	appId: "1:542203216508:web:d3ef1279ef4ddb533bfff9",
	measurementId: "G-CR2NCQ3T7N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();

export default firebase;