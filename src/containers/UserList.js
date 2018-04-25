import React, { Component } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";

class UserList extends Component {
  static propTypes = {

  }

  state = {
    listName: "Completed",
  }

  render() {
    const { listName } = this.state;
    const tabLinks = {
      All: "/user/shit/all",
      Movies: "/user/shit/movies",
      "TV Shows": "/user/shit/tv",
    };
    const movies = [
      {
        id: "12123",
        title: "Black Panther",
        release_date: "2018-02-13",
        poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        media_type: "movie",
        my_rating: "10",
        progress: "completed",
        added: "a minute ago",
      },
      {
        id: "12312",
        title: "Black Panther Long Ass Name Shit Fuck",
        release_date: "2018-02-13",
        poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        media_type: "movie",
        my_rating: "10",
        progress: "completed",
        added: "a minute ago",
      },
    ];

    return (
      <ResponsiveList listName={listName} tabLinks={tabLinks} movies={movies} />
    );
  }
}

export default UserList;
