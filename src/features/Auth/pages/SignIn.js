import { useEffect } from "react";
import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite, signIn } from "../actions/user";

///firebase
import { config, uiConfig } from "../../../firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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
        ///use Redux
        dispatch(signIn(user));
        getFavorite(user.uid);
      });

    return () => unregisterAuthObserver();
  }, []);

  //About database firebase (favorite of user)
  ////use id of user to get favorite in FavoriteOfUsers
  const getFavorite = async (uid) => {
    const docRef = doc(db, "FavoriteOfUsers", uid);
    const favorite = await getDoc(docRef);
    ///use Redux
    const payload = favorite.data().favorite;
    dispatch(addToFavorite(payload));
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(signIn(""));
  };
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
