import tmdbApi, { category, movieType, tvType } from "api/tmdbApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const [items, setItems] = useState([]);
  const [bg, setBg] = useState("");

  const { search } = useParams();

  const fetchListMovies = async () => {
    let respone = null;

    if (search) {
      const params = {
        query: search,
      };
      respone = await tmdbApi.search(props.category, { params });
    } else {
      if (props.type) {
        const params = {};
        switch (props.category) {
          case category.movie:
            respone = await tmdbApi.getMovieList(props.type, { params });
            break;
          case category.tv:
            respone = await tmdbApi.getTvList(props.type, { params });
          default:
            break;
        }

        if (props.filters) {
          const params = {
            with_genres: props.filters.toString(),
          };
          respone = await tmdbApi.filters(props.category, { params });
        }
      }
    }

    setBg(respone.results[0].backdrop_path);
    setItems(respone.results);
  };

  useEffect(() => {
    fetchListMovies();
  }, [props.category, props.type, search, props.filters]);

  return (
    <div>
      {bg && (
        <div
          className="header-bg background"
          style={{
            backgroundImage: `url("http://image.tmdb.org/t/p/original/${bg}")`,
            width: '100vw'
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
