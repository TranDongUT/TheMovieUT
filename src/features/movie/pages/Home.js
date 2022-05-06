import { category, movieType, tvType } from "../../../api/tmdbApi";
import HeroSlide from "../../../components/HeroSlide";
import React from "react";
import MovieSlide from "../components/MovieSlide";

function Home() {
  return (
    <>
      <HeroSlide />
      <div className="list-section">
        <div className="section container">
          <MovieSlide
            categr={category.movie}
            type={movieType.popular}
            title={"Trending Movies"}
          />

          <MovieSlide
            categr={category.movie}
            type={movieType.top_rated}
            title={"Top Rated Movies"}
          />

          <MovieSlide
            categr={category.tv}
            type={tvType.popular}
            title={"Trending TV"}
          />

          <MovieSlide
            categr={category.tv}
            type={tvType.top_rated}
            title={"Top Rated TV"}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
