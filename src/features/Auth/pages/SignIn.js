import style from "./signIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions/user";
import logo from "../../../assets/images/logo.jpg";

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

  // if (!user.userInfor) {
  //   return (
  //     <div className={style.container}>
  //       <div className={style.logo}></div>
  //     </div>
  //   );
  // }

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>
      {!user.userInfor ? (
        //if NOT sign-in
        <>
          <div className={style.title}>
            <h1>The Movie UT</h1>
            <p>Please sign-in:</p>
          </div>
          <StyleFirebase />
        </>
      ) : (
        //or sign-in
        <>
          <div className={style.title}>
            <h1>The Movie UT</h1>
          </div>
          <div className={style.avatar}>
            <img src={user.userInfor.photoURL} alt="" />
          </div>
          <p className={style.welcomeText}>
            Welcome {firebaseApp.auth().currentUser.displayName}! You are now
            signed-in!
          </p>
          <button className="btn" onClick={handleSignOut}>
            Sign-out
          </button>
        </>
      )}
    </div>
  );
}

export default SignIn;
