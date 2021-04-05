import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/firestore";
import "./css/Login.scss";

function initializeFirebase() {
  var config = {
    apiKey: "AIzaSyDwOvI4ruKBCMbteNrkJzBoap4zzzuSgqQ",
    authDomain: "login-ac5ee.firebaseapp.com",
    projectId: "login-ac5ee",
    storageBucket: "login-ac5ee.appspot.com",
    messagingSenderId: "920335775713",
    appId: "1:920335775713:web:3e8f88513e93a17872c4a0",
  };
  //initialize firebase
  firebase.initializeApp(config);
}
initializeFirebase();
const onSubmit = (e) => {
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      localStorage.setItem("emailUser", user.email);
      localStorage.setItem("userName", user.displayName);
      window.location.replace("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function Login() {
  return (
    <div className="app-container">
      <form className="form">
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Sign In with Google!
        </button>
      </form>
    </div>
  );
}
