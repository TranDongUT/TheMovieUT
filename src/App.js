import { useEffect } from "react";
import MRoutes from "config/MRoutes";
import Footer from "components/Footer";
import Header from "./components/Header";
import ScrollToTop from "components/ScrollToTop";
/////redux
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "features/Auth/actions/user";
/////firebase
import "firebase/compat/auth";
import { firebaseApp, firebaseDb } from "./firebase/firebaseConfig";
import { getDoc, doc, setDoc } from "firebase/firestore";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseApp
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("not login");
        } else {
          const docRef = doc(firebaseDb, "FavoriteOfUsers", user.uid);
          const favorite = await getDoc(docRef);
          ///create favoriteList when first SignIn if dont have favorite
          if (!favorite.data()) {
            await setDoc(docRef, {});
          }

          ///use Redux
          const { displayName, email, photoURL, uid } = user;
          const payload = {
            userInfor: { displayName, email, photoURL, uid },
            favoriteList: favorite.data(),
          };

          dispatch(signIn(payload));
        }
      });

    ///cleanup func
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <MRoutes />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
