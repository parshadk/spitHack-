import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign Up
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Sign In
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Sign Out
export const logOut = () => signOut(auth);
