

import firebase from 'firebase'

//setting it up
firebase.initializeApp({
  apiKey: "AIzaSyDV65Ogt_a3lJ26y_-f_c09cJiYtF7wm4w",
  authDomain: "lifehack-3592c.firebaseapp.com",
  databaseURL: "https://lifehack-3592c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lifehack-3592c",
  storageBucket: "lifehack-3592c.appspot.com",
  messagingSenderId: "851792703547",
  appId: "1:851792703547:web:ea7ebf32bd0d23f371ec1e"
})

// making a variable that we can use
const Firebase = firebase
export default Firebase