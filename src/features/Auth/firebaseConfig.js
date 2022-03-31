import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
export const config = {
  apiKey: "AIzaSyCpIxJHtG0E5vxR-DNWrcTntNIUp_cd_SY",
  authDomain: "the-movie-ut-7c610.firebaseapp.com",
  projectId: "the-movie-ut-7c610",
};

// Configure FirebaseUI.
export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/sign-in", ///after sigin success
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
