import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    display: "TV Shows",
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
  const [search, setSearch] = useState("");
  let navigate = useNavigate(); 
   
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

  const gotoSearch = useCallback(() => {
    if (search.length > 0) {
      navigate(`/search/${search}`);
    }
  }, [navigate, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    gotoSearch();
  };

  ///user redux
  const userInfor = useSelector((state) => state.user.userInfor);

  return (
    <div ref={headerRef} className="header">
      <div className="container">
        <Link className="logo text-link" to="/">
          TheMovieUT
        </Link>
        <ul className="header-nav">
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
          <form
            onSubmit={handleSubmit}
            className={activeSearch ? "search active" : "search"}
          >
            <input
              ref={inputRef}
              onInput={(e) => setSearch(e.target.value.trim())}
              type="text"
              placeholder="Search movie..."
            />
            <i onClick={handleSearch} className="bx bx-search"></i>
          </form>
          <div className={userInfor ? "avatar-active" : "avatar"}>
            <Link to="/sign-in">
              {userInfor ? (
                <img src={userInfor._delegate.photoURL} alt="" />
              ) : (
                <i className="bx bx-user-circle"></i>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
