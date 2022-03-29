import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter";
import MovieList from "../components/MovieList";

function Catalog() {
  const { category } = useParams();
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState([]);

  const typesMovie = [
    { type: "popular", title: "Popular" },
    { type: "now_playing", title: "Now Playing" },
    { type: "upcoming", title: "Upcoming" },
    { type: "top_rated", title: "Top Rated" },
  ];
  const typesTV = [
    { type: "popular", title: "Popular" },
    { type: "airing_today", title: "Airing Today" },
    { type: "on_the_air", title: "On TV" },
    { type: "top_rated", title: "Top Rated" },
  ];

  const handleFilterItems = (data) => {
    setFilters(data);
  }

  useEffect(() => {
    handleFilterItems();
  }, [filters])
  

  return (
    <div className="catalog">
      <Filter filterItems={handleFilterItems} category={category}/>

      <div className="sort">
        {category == "movie" &&
          typesMovie.map((e, i) => (
            <Tab
              key={i}
              title={e.title}
              onItemClick={() => setSort(e.type)}
              isActive={sort === e.type}
            />
          ))}

        {category == "tv" &&
          typesTV.map((e, i) => (
            <Tab
              key={i}
              title={e.title}
              onItemClick={() => setSort(e.type)}
              isActive={sort === e.type}
            />
          ))}
      </div>
      <div className="movie movie-list-f">
        <MovieList category={category} type={sort} filters={filters}/>
      </div>
    </div>
  );
}

const Tab = ({ title, isActive, onItemClick }) => {
  return (
    <div
      className={isActive ? "sort-item active" : "sort-item"}
      onClick={onItemClick}
    >
      {title}
    </div>
  );
};

export default Catalog;
