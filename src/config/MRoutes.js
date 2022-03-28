import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "features/Auth/pages/SignIn";
import Home from "features/movie/pages/Home";
import Catalog from "features/movie/pages/Catalog";
import Details from "features/movie/pages/detail/Details";
function MRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<Details />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default MRoutes;
