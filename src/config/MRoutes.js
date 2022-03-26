import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "features/movie/pages/Home/Home";
import Movies from "features/movie/pages/Movies/Movies";
import TV from "features/movie/pages/TV/TV";
import SignIn from "features/Auth/pages/SignIn";
function MRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default MRoutes;
