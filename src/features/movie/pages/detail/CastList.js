import tmdbApi from "../../../../api/tmdbApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CastList({ id }) {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  const fecthUrl = async () => {
    const respone = await tmdbApi.credits(category, id);
    setCasts(respone.cast.slice(0, 5));
  };

  useEffect(() => {
    fecthUrl();
  }, [category, id]);

  return (
    <div className="casts">
      {casts.map((item, index) => (
        <div key={index} className="casts-item">
          {item.profile_path ? (
            <img
              className="casts-item-image"
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
            />
          ) : null}
          <div className="casts-item-name">{item.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CastList;
