import tmdbApi from "api/tmdbApi";
import React, { useEffect, useState } from "react";

function Filter(props) {
  const [genres, setGenres] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [activeBtn, setActiveBtn] = useState(false);

  const fetchFilter = async () => {
    const respone = await tmdbApi.genre(props.category);
    setGenres(respone.genres);
    sendData();
  };

  const handleClickItem = (id) => {
    if (filterItems.includes(id)) {
      const index = filterItems.findIndex((i) => i == id);
      filterItems.splice(index, 1);

      fetchFilter();
    } else {
      setFilterItems([...filterItems, id]);
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
