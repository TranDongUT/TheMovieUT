import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import bookApi from "./api/tmdbApi";
import MRoutes from "config/MRoutes";
import Footer from "components/Footer";
import Header from "./components/Header";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header/>
      <MRoutes />
      <Footer />
    </div>
  );
}

export default App;
