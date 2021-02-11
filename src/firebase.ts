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
  apiKey: "AIzaSyA9BzWL4uvw7pu8VXziVhV_xh81JLuVmRc",
  authDomain: "fir-88ce0.firebaseapp.com",
  databaseURL: "https://fir-88ce0.firebaseio.com",
  projectId: "fir-88ce0",
  storageBucket: "fir-88ce0.appspot.com",
  messagingSenderId: "434021351212",
  appId: "1:434021351212:web:4a60b1bf2c235c16bfb689",
};

const firebaseApp = firebase.initializeApp(firebaseSettings);

export const firebaseAuth = firebaseApp.auth();

export const firestore = firebaseApp.firestore();

export default firebaseApp;
