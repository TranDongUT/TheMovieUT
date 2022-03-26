import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const headerNav = [
  {
    display: "Home",
    path: "/",
    icon: <i className="bx bxs-home"></i>,
  },
  {
    display: "Movies",
    path: "/movie",
    icon: <i className="bx bxs-movie-play"></i>,
  },
  {
    display: "TV Series",
    path: "/tv",
    icon: <i className="bx bxs-tv"></i>,
  },
  {
    display: "User",
    path: "/user",
    icon: <i className="bx bx-user"></i>,
  },
];
function Header() {
  const { pathname } = useLocation();

  const headerRef = useRef(null);
  const inputRef = useRef();
  const [activeSearch, setActiveSearch] = useState(false);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleSearch = () => {
    inputRef.current.focus();
    if (activeSearch == false) {
      setActiveSearch(true);
    } else {
      setActiveSearch(false);
    }
  };

  return (
    <div ref={headerRef} className="header">
      <div className="container">
        <ul className="header-nav">
          <Link className="logo text-link" to="/">
            TheMovieUT
          </Link>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link className="text-link" to={e.path}>
                <span className="header-icon">{e.icon}</span>
                <span
                  className={
                    e.display == "User"
                      ? "header-name name-user"
                      : "header-name"
                  }
                >
                  {e.display}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="header-right">
          <form className={activeSearch ? "search active" : "search"}>
            <input ref={inputRef} type="text" placeholder="Search movie..." />
            <i onClick={handleSearch} className="bx bx-search"></i>
          </form>
          <div className="avatar">
            <Link to="/sign-in">
              <img
                src="https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
