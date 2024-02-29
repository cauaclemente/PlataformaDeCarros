import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdoR0FaCQ4uzGgih0ClXbFyw1fpyNu_ks",
  authDomain: "webautomotivos.firebaseapp.com",
  projectId: "webautomotivos",
  storageBucket: "webautomotivos.appspot.com",
  messagingSenderId: "86984543555",
  appId: "1:86984543555:web:ac0247aad9ea23c58db3f6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage};