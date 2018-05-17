import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import moment from "moment-mini";
import { Link } from "react-router-dom";
import { getFullImgPath } from "../../api/APIUtils";
import ListDeleteBtn from "./ListDeleteBtn";
import "../../css/CardList.scss";

function CardList({ entries, isEditMode, deleteEntry }) {
  return (
    <div className="card-list">
      <ul>
        {
          entries.map((movie) => {
            const icon = (movie.media_type === "movie") ? "film" : "tv";
            const url = `/${movie.media_type}/${movie.id}`;
            return (
              <div className="card-list-item-wrapper">
                <li key={movie.id} className="card-list-item">
                  <Link className="poster" to={url}>
                    <img
                      src={getFullImgPath(movie.poster_path, "w185")}
                      alt={`Poster of ${movie.title}`}
                    />
                  </Link>
                  <h1 className="title">
                    <Link to={url}>
                      {movie.title} ({movie.release_year})
                    </Link>
                  </h1>
                  <div className="info">
                    <div className="progress">{movie.progress || "-"}</div>
                    <div className="rating">
                      <FontAwesomeIcon icon="star" />
                      {movie.vote_average || "-"}
                    </div>
                    <div className="added">Added {moment(movie.added.toDate()).fromNow()}</div>
                    <div className="media-type">
                      <FontAwesomeIcon icon={icon} />
                    </div>
                  </div>
                </li>
                {isEditMode && <ListDeleteBtn onClick={() => deleteEntry(movie.id)} />}
              </div>
            );
          })
        }
      </ul>
    </div>
  );
}

CardList.propTypes = {
  entries: PropTypes.array.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

export default CardList;
