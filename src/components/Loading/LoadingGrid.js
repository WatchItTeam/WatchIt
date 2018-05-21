import React from "react";
import PropTypes from "prop-types";
import LoadingCard from "./LoadingCard";
import "../../css/PosterGrid.scss";

function LoadingGrid({ amount }) {
  const loadingCards = [];
  for (let i = 0; i < amount; i++) {
    loadingCards.push(<LoadingCard key={i} />);
  }
  return (
    <div className="poster-grid">
      {loadingCards}
    </div>
  );
}

LoadingGrid.defaultProps = {
  amount: 18,
};

LoadingGrid.propTypes = {
  amount: PropTypes.number,
};

export default LoadingGrid;
