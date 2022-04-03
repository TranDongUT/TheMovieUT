import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "features/Auth/pages/SignIn";
import Home from "features/movie/pages/Home";
import Catalog from "features/movie/pages/Catalog";
import Details from "features/movie/pages/detail/Details";
import Search from "features/movie/pages/Search";
import User from "features/movie/pages/User";
function MRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<Details />} />
        <Route path="/:category/:type" element={<Catalog />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default MRoutes;
