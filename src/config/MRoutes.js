import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "features/Auth/pages/SignIn";
import Home from "features/movie/pages/Home";
import Catalog from "features/movie/pages/Catalog";
function MRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default MRoutes;
