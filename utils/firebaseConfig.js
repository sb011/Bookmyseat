import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjKtZrZ_nkLkGc7goLbLX8HHQ_WlYon5s",
  authDomain: "bookmyseat-75b13.firebaseapp.com",
  projectId: "bookmyseat-75b13",
  storageBucket: "bookmyseat-75b13.appspot.com",
  messagingSenderId: "869849498277",
  appId: "1:869849498277:web:07a38dd60525b8a88f434c"
};

// const firebaseConfig = {
//   apiKey: `${process.env.apiKey}`,
//   authDomain: `${process.env.authDomain}`,
//   projectId: `${process.env.projectId}`,
//   storageBucket: `${process.env.storageBucket}`,
//   messagingSenderId: `${process.env.messagingSenderId}`,
//   appId: `${process.env.appId}`,
// }

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app)