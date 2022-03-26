import { useEffect, useState } from "react";
import MRoutes from "config/MRoutes";
import Footer from "components/Footer";
import Header from "./components/Header";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyA3ukerUAjiLGyaaymsqRIOSpBJ0yFtq94",
  authDomain: "themovieut.firebaseapp.com",
};
firebase.initializeApp(config);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div className="App">
      <Header />
      <MRoutes />
      <Footer />
    </div>
  );
}

export default App;
