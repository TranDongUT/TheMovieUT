import tmdbApi, { category, movieType, tvType } from "../../../api/tmdbApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import noImage from "../../../assets/images/no-image.png";

function MovieList(props) {
  ////{category, filter, type} = props <- from Catalog
  const [items, setItems] = useState([]);
  const [bg, setBg] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { search } = useParams();

  const fetchListMovies = async () => {
    let respone = null;

    ////For search input
    if (search) {
      const params = {
        query: search,
        page: page,
      };
      respone = await tmdbApi.search(props.category, { params });
    } else {
      /////for default TV or Movie
      if (props.type) {
        const params = {
          page: page,
        };
        switch (props.category) {
          case category.movie:
            respone = await tmdbApi.getMovieList(props.type, { params }); ////movie
            break;
          case category.tv:
            respone = await tmdbApi.getTvList(props.type, { params }); ////TV
            break;
          default:
            throw new Error("invalid Type");
        }
      }
    }

    // background
    setBg(respone.results[0].backdrop_path);
    // result
    setItems(respone.results);
    setTotalPages(respone.total_pages);
  };

  ///default
  useEffect(() => {
    fetchListMovies();
  }, [props.category, props.type, search, page]);

  ///after filter change
  useEffect(() => {
    let respone = {};
    const fetchAfterFilter = async () => {
      const params = {
        with_genres: props.filters.toString(),
        page: page,
      };
      respone = await tmdbApi.filters(props.category, { params });
      setBg(respone.results[0].backdrop_path);
      setItems(respone.results);
      setTotalPages(respone.total_pages);
    };
    if (props.filters) {
      fetchAfterFilter();
    }
  }, [props.filters, page]);

  //pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // reset page
  useEffect(() => {
    setPage(1);
  }, [props.category, props.type, search, props.filters]);

  return (
    <div>
      {bg ? (
        <div
          className="header-bg background"
          style={{
            backgroundImage: `url("http://image.tmdb.org/t/p/original/${bg}")`,
            width: "100vw",
          }}
        ></div>
      ) : (
        <div
          className="header-bg background"
          style={{
            backgroundImage: `url(${noImage})`,
            width: "100vw",
          }}
        ></div>
      )}
      <div className="container">
        <div className="movie-grid">
          {items.map((item, i) => (
            <MovieCard key={i} item={item} category={props.category} />
          ))}
        </div>

        <Pagination
          totalPages={totalPages}
          page={page}
          onChangePage={handlePageChange}
          category={props.category}
          type={props.type}
          search={search}
          filters={props.filters}
        />
      </div>
    </div>
  );
}

export default MovieList;
