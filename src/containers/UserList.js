import React, { Component } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";
import parseName from "../utils/parseName";
import ErrorMessage from "../components/ErrorMessage";

class UserList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static getDerivedStateFromProps(props) {
    // set the display name of the list
    const { listName } = props.match.params;
    const listDisplayName = parseName(listName);
    return { listDisplayName };
  }

  state = {
    errorMsg: "",
    listDisplayName: "Completed",
    isEditMode: false,
    listEntries: [
      // placeholder data
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
    const { userId, listName, mediaType } = this.props.match.params;
    console.log(`Fetching ${mediaType} from ${listName} by ${userId}`);
    /*
    something like this:

    try {
      const listEntries = await getListFromFirebase(userId, listName, mediaType);
      this.setState({ listEntries, errorMsg: null });
    } catch(error) {
      this.setState({ errorMsg: error });
    }

    or

    await getListFromFirebase(userId, listName, mediaType)
      then((listEntries) => {
        this.setState({ listEntries, errorMsg: null });
      })
      .catch((error) => {
        this.setState({ errorMsg: error });
      })
    */
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
    const { errorMsg, listDisplayName, listEntries, isEditMode } = this.state;
    if (errorMsg) {
      return <ErrorMessage>{errorMsg}</ErrorMessage>;
    }

    const { userId, listName } = this.props.match.params;
    const baseUrl = `/user/${userId}/${listName}`;
    const tabLinks = {
      All: `${baseUrl}/all`,
      Movies: `${baseUrl}/movies`,
      "TV Shows": `${baseUrl}/tv`,
    };

    return (
      <ResponsiveList
        listDisplayName={listDisplayName}
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
