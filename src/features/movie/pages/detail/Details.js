import tmdbApi from "api/tmdbApi";
import MovieSlide from "features/movie/components/MovieSlide";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CastList from "./CastList";
import Video from "./Video";

function Details() {
  const { category, id } = useParams();
  const [item, setItem] = useState({});
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(false);

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
    if (activeVideo && videoRef.current){
      videoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
      setActiveVideo(false)
    }
  })

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
                      <li className="detail-date">{item.release_date || item.last_air_date}</li>
                      <li className="detail-time">{item.runtime ?  time(item.runtime) : `${item.episode_run_time[0]}m`}</li>
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

                  <button
                    onClick={() => setActiveVideo(true)}
                    className="btn btn-trailer"
                  >
                    Watch Now
                  </button>

                  <div className="detail-cast">
                    <h3>Casts</h3>
                    <CastList id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Video innerRef={videoRef} category={category} item={item}/>

          <div className="container">
            <MovieSlide id={item.id} categr={category} type={"similar"} title={"Similar"}/>
          </div>
        </>
      )}
    </>
  );
}

export default Details;
