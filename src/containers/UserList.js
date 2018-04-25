import React, { Component } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";

class UserList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  state = {
    listName: "Completed",
    isEditMode: false,
    listEntries: [
      {
        id: "284054",
        title: "Black Panther",
        release_date: "2018-02-13",
        poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        media_type: "movie",
        my_rating: "10",
        progress: "completed",
        added: "a minute ago",
      },
      {
        id: "300668",
        title: "Annihilation",
        release_date: "2018-02-22",
        poster_path: "/d3qcpfNwbAMCNqWDHzPQsUYiUgS.jpg",
        media_type: "movie",
        my_rating: "10",
        progress: "completed",
        added: "a minute ago",
      },
    ],
  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchList();
    }
  }

  // TODO: fetch list items from firebase
  async fetchList() {
    const { mediaType } = this.props.match.params;
    console.log(`Fetching ${mediaType}`);
    // const listEntries = await getListFromFirebase(userId, listId, mediaType)
    // this.setState({ listEntries });
  }

  toggleEditMode = () => {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  // TODO
  deleteEntry = (id) => {
    alert(`Delete item ${id}`);
  }

  render() {
    const { listName, listEntries, isEditMode } = this.state;
    const tabLinks = {
      All: "/user/shit/completed",
      Movies: "/user/shit/completed/movies",
      "TV Shows": "/user/shit/completed/tv",
    };

    return (
      <ResponsiveList
        listName={listName}
        tabLinks={tabLinks}
        entries={listEntries}
        toggleEditMode={this.toggleEditMode}
        deleteEntry={this.deleteEntry}
        isEditMode={isEditMode}
      />
    );
  }
}

export default UserList;
