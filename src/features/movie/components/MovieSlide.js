import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import tmdbApi, { category } from "../../../api/tmdbApi";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieSlide({ id, categr, type, title }) {
  const [items, setItems] = useState([]);

  const fetchListMovies = async () => {
    let respone = null;
    const params = {};

    if (type !== "similar") {
      switch (categr) {
        case category.movie:
          respone = await tmdbApi.getMovieList(type, { params });
          break;
        default:
          respone = await tmdbApi.getTvList(type, { params });
      }
    } else {
      respone = await tmdbApi.similar(categr, id);
    }
    setItems(respone.results);
  };

  useEffect(() => {
    fetchListMovies();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        <div className="movie-list-title">
          <h3>{title}</h3>
          {type != "similar" && (
            <Link className="text-link" to={`/${categr}`}>
              <i className="bx bx-chevron-right"></i>
            </Link>
          )}
        </div>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={categr} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieSlide;
