// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtVacLO8qQiztAnulDZi2zrRSSZ-s7oA4",
  authDomain: "job-application-tracker-ad02a.firebaseapp.com",
  projectId: "job-application-tracker-ad02a",
  storageBucket: "job-application-tracker-ad02a.firebasestorage.app",
  messagingSenderId: "638123008703",
  appId: "1:638123008703:web:94f9cc84d36903f5445c0a",
  measurementId: "G-17YMXBWSBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const loginWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider)
    return result.user
}

export const logout = async() => {
    await signOut(auth)
}
