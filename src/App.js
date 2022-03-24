import axios from "axios";
import { useEffect } from "react";
import bookApi from "./api/bookApi";

function App() {
  useEffect(() => {
    const fetchBooks = async () => {
      const params = { q: "react", maxResults: "10", startIndex: "5" };
      const respone = await bookApi.getAll(params);
      console.log(respone);
    };
    fetchBooks();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
