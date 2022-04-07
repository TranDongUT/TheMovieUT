import { useEffect } from "react";
import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite, signIn } from "../actions/user";

///firebase
import { firebaseApp, StyleFirebase } from "../../../firebase/firebaseConfig";

/////////////////////////////////////////////
function SignIn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
