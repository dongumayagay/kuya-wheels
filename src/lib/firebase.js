// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD3RTU8venJ6LU1kFaoqRkcjHYstkf4CqE',
	authDomain: 'kuya-wheels.firebaseapp.com',
	projectId: 'kuya-wheels',
	storageBucket: 'kuya-wheels.appspot.com',
	messagingSenderId: '1003682086151',
	appId: '1:1003682086151:web:f8a031ecdd0d46750c59a2',
	measurementId: 'G-HNC3DQLQ82'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)