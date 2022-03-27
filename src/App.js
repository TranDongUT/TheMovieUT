import { useEffect, useState } from "react";
import MRoutes from "config/MRoutes";
import Footer from "components/Footer";
import Header from "./components/Header";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function App() {
  return (
    <div className="App">
      <Header />
      <MRoutes />
      <Footer />
    </div>
  );
}

export default App;
