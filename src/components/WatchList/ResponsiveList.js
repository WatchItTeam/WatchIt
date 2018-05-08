import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Desktop, Mobile } from "../Responsive";
import Tabs from "../Tabs";
import TableList from "./TableList";
import CardList from "./CardList";
import "../../css/ResponsiveList.scss";

function ResponsiveList({
  isLoading, listDisplayName, tabLinks, entries,
  toggleEditMode, deleteEntry, isEditMode,
}) {
  const btnContent = isEditMode ? "Done" : <FontAwesomeIcon icon="edit" />;
  let lists;
  if (isLoading) {
    lists = "Loading...";
  } else if (entries.length === 0) {
    lists = "Nothing in this list";
  } else {
    lists = (
      <div>
        <Desktop>
          <TableList entries={entries} isEditMode={isEditMode} deleteEntry={deleteEntry} />
        </Desktop>
        <Mobile>
          <CardList entries={entries} isEditMode={isEditMode} deleteEntry={deleteEntry} />
        </Mobile>
      </div>
    );
  }
  return (
    <section className="watch-list container">
      <div className="title-bar">
        <h1>{listDisplayName}</h1>
        <button className="edit-btn" onClick={toggleEditMode}>
          {btnContent}
        </button>
      </div>
      <Tabs links={tabLinks} />
      {lists}
    </section>

  );
}

ResponsiveList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  listDisplayName: PropTypes.string.isRequired,
  // key is name of tab, value is url tab should navigate to
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  entries: PropTypes.array.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default ResponsiveList;
