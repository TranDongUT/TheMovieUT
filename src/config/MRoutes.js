import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "features/movie/pages/Home/Home";
import Movies from "features/movie/pages/Movies/Movies";
import TV from "features/movie/pages/TV/TV";
function MRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </div>
  );
}

export default MRoutes;
