import { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions/user";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCpIxJHtG0E5vxR-DNWrcTntNIUp_cd_SY",
  authDomain: "the-movie-ut-7c610.firebaseapp.com",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/sign-in", ///after sigin success
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        const tokenId = await user.getIdToken();
        console.log(user);
        dispatch(signIn(tokenId));
      });
    return () => unregisterAuthObserver();
  }, []);

  if (!user.isSignIn) {
    return (
      <div className={style.container}>
        <div>
          <h1>The Movie UT</h1>
          <p>Please sign-in:</p>
        </div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div>
        <h1>The Movie UT</h1>
      </div>
      <p>
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}

export default SignIn;
