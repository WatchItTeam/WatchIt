import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import ListDeleteBtn from "./ListDeleteBtn";
import ListMoveBtn from "./ListMoveBtn";
import PosterCard from "../PosterCard";
import "../../css/TableList.scss";

function TableList({ entries, isEditMode, deleteEntry, onMove }) {
  return (
    <table className="watch-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Rating</th>
          <th>Progress</th>
          <th>Added</th>
          {isEditMode && <th className="move-text">Move</th>}
          {isEditMode && <th className="delete-text">Delete</th>}
        </tr>
      </thead>
      <tbody>
        {
          entries.map(movie => (
            <tr key={movie.id}>
              <td className="poster-name">
                <PosterCard
                  className="poster"
                  key={movie.id}
                  id={movie.id}
                  linkTo={`/${(movie.media_type)}/${movie.id}`}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  mediaType={movie.media_type}
                  voteAverage={movie.vote_average}
                />
              </td>
              <td>{movie.media_type}</td>
              <td>{movie.vote_average || "-"}</td>
              <td>{movie.progress || "-"}</td>
              <td>{moment(movie.added.toDate()).fromNow()}</td>
              {isEditMode && <td><ListMoveBtn onClick={() => onMove(movie)} /></td>}
              {isEditMode && <td><ListDeleteBtn onClick={() => deleteEntry(movie)} /></td>}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

TableList.propTypes = {
  entries: PropTypes.array.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default TableList;
