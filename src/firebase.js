import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "harmonia-dfc9e.firebaseapp.com",
  projectId: "harmonia-dfc9e",
  storageBucket: "harmonia-dfc9e.appspot.com",
  messagingSenderId: "240363019274",
  appId: "1:240363019274:web:4cd81725e3d1425dd653f3"

};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);