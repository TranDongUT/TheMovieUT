import tmdbApi, { category, movieType, tvType } from "api/tmdbApi";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const [items, setItems] = useState([]);
  const [bg, setBg] = useState("");

  const fetchListMovies = async () => {
    let respone = null;
    const params = {};

    switch (props.category) {
      case category.movie:
        respone = await tmdbApi.getMovieList(movieType.popular, { params });
        break;
      case category.tv:
        respone = await tmdbApi.getTvList(tvType.popular, { params });
      default:
        break;
    }
    setBg(respone.results[0].backdrop_path);
    setItems(respone.results);
  };

  useEffect(() => {
    fetchListMovies();
  }, [props.category]);

  return (
    <div>
      {bg && (
        <div
          className="header-bg background"
          style={{
            backgroundImage: `url("http://image.tmdb.org/t/p/original/${bg}")`,
          }}
        ></div>
      )}
      <div className="container">
        <div className="movie-grid">
          {items.map((item, i) => (
            <MovieCard key={i} item={item} category={props.category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
