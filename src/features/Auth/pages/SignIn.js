import { useEffect } from "react";
import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite, signIn } from "../actions/user";
///firebase
import { config, uiConfig } from "../firebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const app = firebase.initializeApp(config);
const db = getFirestore(app);

/////////////////////////////////////////////
function SignIn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = app
      .auth()
      .onAuthStateChanged(async (user) => {
        const tokenId = await user.getIdToken();
        ///use Redux
        dispatch(signIn(user));
        ////About database firebase (favorite of user)
        ////use id of user to get favorite in FavoriteOfUsers
        const docRef = doc(db, "FavoriteOfUsers", user.uid);
        const favorite = await getDoc(docRef);
        if (favorite.exists()) {
          const payload = favorite.data().Favorite;
          dispatch(addToFavorite(payload));
        } else {
          // doc.data() will be undefined in this case
          console.log("Empty data");
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  console.log(user);

  //if not sign-in
  if (!user.userInfor) {
    return (
      <div className={style.container}>
        <div className={style.logo}></div>
        <div className={style.title}>
          <h1>The Movie UT</h1>
          <p>Please sign-in:</p>
        </div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
      </div>
    );
  }

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(signIn(""));
  };

  return (
    <div className={style.container}>
      <div className={style.logo}></div>
      <div className={style.title}>
        <h1>The Movie UT</h1>
      </div>
      <p>
        Welcome {app.auth().currentUser.displayName}! You are now signed-in!
      </p>
      <button onClick={handleSignOut}>Sign-out</button>
    </div>
  );
}

export default SignIn;
