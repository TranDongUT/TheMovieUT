import tmdbApi, { category } from "../../../api/tmdbApi";
import { addToFavorite, signIn } from "../../Auth/actions/user";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseApp, firebaseDb } from "../../../firebase/firebaseConfig";
import backgroundUser from "../../../assets/images/backgroundUser.jpg";
import { Link } from "react-router-dom";

function User() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const listFavorID = Object.values(user.favoriteList); //object --> array
  const [tabCategory, setTabCategory] = useState("movie");

  const handleClickTab = (type) => {
    setTabCategory(type);
  };

  const handleSignOut = () => {
    firebaseApp.auth().signOut();
    dispatch(signIn(""));
    localStorage.removeItem("isLoginFirebase");
  };

  return (
    <>
      {firebaseApp.auth().currentUser && (
        <div className="user ">
          <div
            className="infor"
            style={{ backgroundImage: `url(${backgroundUser})` }}
          >
            <div className="container">
              <img
                className="infor-img"
                src={firebaseApp.auth().currentUser.photoURL}
                alt=""
              />
              <div className="infor-name">
                {firebaseApp.auth().currentUser.displayName}

                <Link to="/">
                  <button className="sign-out" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="list-favor container">
            <div className="title-list">
              <h2>My Favorites</h2>

              <div className="tab-category">
                <div
                  className={
                    tabCategory == "movie" ? "tabItem active" : "tabItem"
                  }
                  onClick={() => handleClickTab("movie")}
                >
                  Movies
                </div>
                <div
                  className={tabCategory == "tv" ? "tabItem active" : "tabItem"}
                  onClick={() => handleClickTab("tv")}
                >
                  TV Shows
                </div>
              </div>
            </div>
            {listFavorID.map((i) => (
              <div key={i.id}>
                {i.category == tabCategory && (
                  <FavoriteItem id={i.id} category={tabCategory} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const FavoriteItem = ({ id, category }) => {
  const [item, setItem] = useState({});

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRemoveFavor = async (id) => {
    const docRef = doc(firebaseDb, "FavoriteOfUsers", user.userInfor.uid);
    await updateDoc(docRef, {
      [id]: deleteField(),
    });
    const newList = user.favoriteList;
    delete newList[id];

    ///re-store redux
    dispatch(addToFavorite(newList));
  };

  useEffect(() => {
    const fetchItem = async () => {
      const params = {};
      const respone = await tmdbApi.detail(category, id, { params });
      setItem(respone);
    };
    fetchItem();
  }, [user]);

  const link = `/${category}/${id}`;

  return (
    <>
      {item.id && (
        <div className="favor-item">
          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
          <div className="desc">
            <div className="title">
              <Link className="text-link" to={link}>
                <h2>{item.original_title || item.name}</h2>
              </Link>
              <div>{item.release_date || item.last_air_date}</div>
            </div>
            <p>{item.overview}</p>
            <div className="item-remove">
              <button onClick={() => handleRemoveFavor(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
