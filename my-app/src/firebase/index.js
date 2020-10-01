import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBEcVpjilbSqXm9q8N3Oar_Rj8ZdyDNG9Q",
    authDomain: "image-upload-7358e.firebaseapp.com",
    databaseURL: "https://image-upload-7358e.firebaseio.com",
    projectId: "image-upload-7358e",
    storageBucket: "image-upload-7358e.appspot.com",
    messagingSenderId: "948769421553",
    appId: "1:948769421553:web:b9667597d91f14cde15150",
    measurementId: "G-REJJNTY3XE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage,firebase as default}