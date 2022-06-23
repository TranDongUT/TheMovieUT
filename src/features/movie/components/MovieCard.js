import { Link } from "react-router-dom";

function MovieCard(props) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const link = `/${props.category}/${props.item.id}`;

  return (
    <Link className="text-link" to={link}>
      <div className="movie-card">
        {props.item.poster_path ? (
          <img
            className="movie-card-img"
            src={`${IMAGE_PATH}${props.item.poster_path}`}
          />
        ) : null}
        <div className="movie-card-vote">
          <i className="bx bxs-star"></i>
          {props.item.vote_average}
        </div>
        <h5 className="movie-card-title">
          <span>{props.item.title || props.item.name}</span>
        </h5>
      </div>
    </Link>
  );
}

export default MovieCard;
