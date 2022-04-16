import tmdbApi from "api/tmdbApi";
import MovieSlide from "features/movie/components/MovieSlide";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CastList from "./CastList";
import Video from "./Video";
//redux
import { addToFavorite } from "features/Auth/actions/user";

//firebase
import { firebaseDb } from "../../../../firebase/firebaseConfig";
import {
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

//////////////////////////////////////////////////////////////////

function Details() {
  const { category, id } = useParams();
  const [item, setItem] = useState({});
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(false);
  const navigate = useNavigate();

  const fetchItem = async () => {
    const params = {};
    const respone = await tmdbApi.detail(category, id, { params });
    setItem(respone);
  };

  const time = (t) => {
    const h = Math.floor(t / 60);
    const m = t - h * 60;
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    fetchItem();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [category, id]);

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
      setActiveVideo(false);
    }
  });

  ///////////about user favorite
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddFavorite = async (id, imdb_id = null) => {
    if (user.userInfor) {
      const docRef = doc(firebaseDb, "FavoriteOfUsers", user.userInfor.uid);
      // const favorite = await getDoc(docRef);
      const newObj = {
        id: id,
        category: imdb_id ? "movie" : "tv", ///nếu là movie thì có imdb_id, còn tv thì ko có
      };

      const newList = {
        ...user.favoriteList,
        [id]: newObj,
      };
      await updateDoc(docRef, newList);
      ///re-store redux
      dispatch(addToFavorite(newList));
    }
  };

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

  return (
    <>
      {item.id && (
        <>
          <div
            className="detail background"
            style={{
              backgroundImage: `url("http://image.tmdb.org/t/p/w500/${item.backdrop_path}")`,
            }}
          >
            <div className="container">
              <div className="detail-info">
                <div className="detail-image">
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  />
                </div>
                <div className="detail-desc">
                  <h2>{item.original_title || item.name}</h2>

                  <div className="detail-genres">
                    <ul className="detail-date-time">
                      <li className="detail-date">
                        {item.release_date || item.last_air_date}
                      </li>
                      <li className="detail-time">
                        {item.runtime
                          ? time(item.runtime)
                          : `${item.episode_run_time[0]}m`}
                      </li>
                    </ul>
                    <div className="detail-list-genres">
                      {item.genres &&
                        item.genres.slice(0, 5).map((genre, index) => (
                          <span key={index} className="genres-item">
                            {genre.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="detail-overview">
                    <h3>Overview</h3>
                    <p>{item.overview}</p>
                  </div>

                  <div className="btn-field">
                    <button
                      ///watch button
                      onClick={() => setActiveVideo(true)}
                      className="btn btn-trailer"
                    >
                      Watch Now
                    </button>
                    {
                      ///handle add/remove favorite
                      user.userInfor ? (
                        <i
                          className={`${
                            user.favoriteList[item.id]
                              ? "bx bxs-heart added"
                              : "bx bx-heart"
                          }  btn-addToFavor `}
                          ///handle with Redux
                          onClick={() =>
                            user.favoriteList[item.id]
                              ? handleRemoveFavor(item.id)
                              : handleAddFavorite(item.id, item.imdb_id)
                          }
                        ></i>
                      ) : (
                        <i
                          className="bx bx-heart btn-addToFavor"
                          ///direct to login page
                          onClick={() => navigate("/sign-in")}
                        ></i>
                      )
                    }
                  </div>

                  <div className="detail-cast">
                    <h3>Casts</h3>
                    <CastList id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Video innerRef={videoRef} category={category} item={item} />

          <div className="container">
            <MovieSlide
              id={item.id}
              categr={category}
              type={"similar"}
              title={"Similar"}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Details;
