import MRoutes from "config/MRoutes";
import Footer from "components/Footer";
import Header from "./components/Header";
import ScrollToTop from "components/ScrollToTop";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function App() {
  return (
    <div className="App">
      <Header />
      <MRoutes />
      <Footer />
      <ScrollToTop/>
    </div>
  );
}

export default App;
