import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { getFullImgPath } from "../api/APIUtils";
import "../css/ImageWithFallback.scss";

/**
 * Reusable image component which displays a fallback if src is null/undefined
 */
function ImageWithFallback({ src, imgSize, mediaType, alt, className }) {
  if (src) {
    return <img className={`${className} img-with-fb`} src={getFullImgPath(src, imgSize)} alt={alt} />;
  }

  let icon;
  switch (mediaType) {
    case "movie":
      icon = "film";
      break;
    case "tv":
      icon = "tv";
      break;
    default:
      icon = "image";
      break;
  }
  return (
    <div className={`${className} fallback-img`}>
      <FontAwesomeIcon icon={icon} fixedWidth />
      <p className="no-img-text">No image</p>
    </div>
  );
}

ImageWithFallback.defaultProps = {
  src: null,
  imgSize: "original",
  alt: "",
  className: "",
  mediaType: "",
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  /* imgSize examples: "w342", "w500" etc */
  imgSize: PropTypes.string,
  mediaType: PropTypes.oneOf(["movie", "tv", "person", ""]),
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageWithFallback;
