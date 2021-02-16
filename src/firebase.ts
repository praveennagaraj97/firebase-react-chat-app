import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

interface Settings {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseSettings: Settings = {
  apiKey: ,
  authDomain: ,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: ,
};

const firebaseApp = firebase.initializeApp(firebaseSettings);

export const firebaseAuth = firebaseApp.auth();

export const firestore = firebaseApp.firestore();

export default firebaseApp;
