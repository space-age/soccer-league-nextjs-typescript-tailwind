// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { GetAppSharp } from '@mui/icons-material'
// import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlfNsIRk78g1DfCFRzmSFjABuDbN9gOtM',
  authDomain: 'adult-soccer-league-ec8d6.firebaseapp.com',
  projectId: 'adult-soccer-league-ec8d6',
  storageBucket: 'adult-soccer-league-ec8d6.appspot.com',
  messagingSenderId: '576930892842',
  appId: '1:576930892842:web:96cdfadd6369b5d4f64753',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
