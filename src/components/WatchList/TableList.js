import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getFullImgPath, normalizeMovie } from "../../api/APIUtils";
import "../../css/TableList.scss";

function TableList({ movies }) {
  return (
    <table className="watch-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>My Rating</th>
          <th>Progress</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((mov) => {
            const movie = normalizeMovie(mov);
            return (
              <tr key={movie.id}>
                <td className="poster-name">
                  <Link to={`/${movie.media_type}/${movie.id}`}>
                    <img
                      src={getFullImgPath(movie.poster_path, "w92")}
                      className="poster"
                      alt=""
                    />
                    {movie.title} ({movie.release_year})
                  </Link>
                </td>
                <td>{movie.media_type}</td>
                <td>{movie.my_rating}</td>
                <td>{movie.progress}</td>
                <td>{movie.added}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

TableList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default TableList;
