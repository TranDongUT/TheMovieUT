import tmdbApi from "api/tmdbApi";
import React, { useEffect, useState } from "react";

function Filter(props) {
  ///{filterItems, category} = props <- from Catalog
  const [genres, setGenres] = useState([]); ////state: list type movie from api
  const [filterItems, setFilterItems] = useState([]);
  const [activeBtn, setActiveBtn] = useState(false);

  const fetchFilter = async () => {
    const respone = await tmdbApi.genre(props.category);
    setGenres(respone.genres);
  };

  let newFilters = [];
  const handleClickItem = (id) => {
    if (filterItems.includes(id)) {
      const index = filterItems.findIndex((i) => i == id);
      setFilterItems((prev) => {
        newFilters = [...prev];
        newFilters.splice(index, 1);
        return newFilters;
      });
    } else {
      setFilterItems((prev) => {
        newFilters = [...prev, id];
        return newFilters;
      });
    }
  };

  const sendData = () => {
    props.filterItems(filterItems);
  };

  const handleClickBtn = () => {
    if (activeBtn) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  useEffect(() => {
    //fetchFilter();
    sendData();
  }, [filterItems]);

  useEffect(() => {
    setFilterItems([]);
  }, [props.category]);

  return (
    <div className={activeBtn ? "filter active" : "filter"}>
      <div className="icon-filter" onClick={handleClickBtn}>
        <i className="bx bx-filter"></i>
      </div>
      <div className="container">
        <div className="list-filter">
          <h3>Genres</h3>
          {genres.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClickItem(item.id)}
              className={
                filterItems.includes(item.id)
                  ? "filter-item active"
                  : "filter-item"
              }
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
