import React from "react";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "../Responsive";
import Tabs from "../Tabs";
import TableList from "./TableList";
import CardList from "./CardList";

function ResponsiveList({ listName, tabLinks, movies }) {
  return (
    <section className="watch-list container">
      <h1>{listName}</h1>
      <Tabs links={tabLinks} />
      <Desktop>
        <TableList movies={movies} />
      </Desktop>
      <Mobile>
        <CardList movies={movies} />
      </Mobile>
    </section>
  );
}

ResponsiveList.propTypes = {
  listName: PropTypes.string.isRequired,
  // key is name of tab, value is url tab should navigate to
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  movies: PropTypes.array.isRequired,
};

export default ResponsiveList;
