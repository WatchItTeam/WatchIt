import React from "react";
import PropTypes from "prop-types";
import ActorPresentation from "./ActorPresentation";

/**
 * Markup for the actors page
 */
function ActorPage({ currentActor }) {
  return (
    <div>
      <ActorPresentation currentActor={currentActor} />
    </div>
  );
}

ActorPage.propTypes = {
  currentActor: PropTypes.object.isRequired,
};

export default ActorPage;
