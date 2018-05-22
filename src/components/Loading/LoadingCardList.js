import React from "react";
import "../../css/Loading/LoadingCardList.scss";

function LoadingCardList() {
  const items = [];
  const numberOfItems = 4;

  for (let i = 0; i < numberOfItems; i++) {
    items.push((
      <li className="card-list-item loading-card-list-item">
        <div className="poster" />
        <h1 className="title">
          <div className="long-text" />
        </h1>
        <div className="info">
          <div className="progress">
            <div className="short-text" />
          </div>
          <div className="rating">
            <div className="short-text" />
          </div>
          <div className="added">
            <div className="long-text" />
          </div>
          <div className="media-type">
            <div className="short-text" />
          </div>
        </div>
      </li>
    ));
  }

  return items;
}

export default LoadingCardList;
