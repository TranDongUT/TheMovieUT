import tmdbApi, { movieType } from "api/tmdbApi";
import { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function HeroSlide() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const params = { page: 1 };
      try {
        const respone = await tmdbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovieItems(respone.results.slice(0, 4));
      } catch {}
    };

    fetch();
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => {
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              />
            )}
          </SwiperSlide>;
        })}
      </Swiper>
    </>
  );
}

export default HeroSlide;
