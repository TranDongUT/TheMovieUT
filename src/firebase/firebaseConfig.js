import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getFirestore } from "firebase/firestore";

// Configure Firebase.
export const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
};
// Configure FirebaseUI.
export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/", ///after sigin success
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

///init Firebase
export const firebaseApp = firebase.initializeApp(config);

////database
export const firebaseDb = getFirestore(firebaseApp);

////style login
export const StyleFirebase = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()} />
  );
};
