import { useEffect } from "react";
import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite, signIn } from "../actions/user";

///firebase
import {
  firebaseApp,
  firebaseDb,
  StyleFirebase,
} from "../../../firebase/firebaseConfig";
import { getDoc, doc, setDoc } from "firebase/firestore";

/////////////////////////////////////////////
function SignIn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseApp
      .auth()
      .onAuthStateChanged(async (user) => {
        // const tokenID = await user.getIdToken(); <- when need handle token
        //when login new user
        // localStorage.setItem(
        //   "isLoginFirebase",
        //   JSON.stringify({ ...user.providerData[0], uid: user.uid })
        // );

        const docRef = doc(firebaseDb, "FavoriteOfUsers", user.uid);
        const favorite = await getDoc(docRef);
        ///create favoriteList when first SignIn if dont have favorite
        if (!favorite.data()) {
          await setDoc(docRef, {});
        }
        //localStorage.setItem("favoriteList", JSON.stringify(favorite.data()));

        ///use Redux
        const payload = {
          userInfor: { ...user.providerData[0], uid: user.uid },
          favoriteList: favorite.data(),
        };

        dispatch(signIn(payload));
      });

    return () => unregisterAuthObserver();
  }, []);

  const handleSignOut = () => {
    firebaseApp.auth().signOut();
    dispatch(signIn(""));
  };

  //if not sign-in
  if (!user.userInfor) {
    return (
      <div className={style.container}>
        <div className={style.logo}></div>
        <div className={style.title}>
          <h1>The Movie UT</h1>
          <p>Please sign-in:</p>
        </div>
        <StyleFirebase />
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
        Welcome {firebaseApp.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <button onClick={handleSignOut}>Sign-out</button>
    </div>
  );
}

export default SignIn;
