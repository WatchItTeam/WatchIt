import React, { Component } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";
import parseName from "../utils/parseName";
import ErrorMessage from "../components/ErrorMessage";
import { fetchAllFromList, removeFromList } from "../Firebase/lists";

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
    error: false,
    isLoading: false,
    listDisplayName: "",
    isEditMode: false,
    listEntries: [],
  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchList();
    }
  }

  async fetchList() {
    const { userId, listName, mediaType } = this.props.match.params;

    this.setState({ isLoading: true });

    try {
      const listEntries = await fetchAllFromList(userId, listName, mediaType);
      this.setState({ listEntries, error: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }

    this.setState({ isLoading: false });
  }

  toggleEditMode = () => {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  deleteEntry = (id) => {
    removeFromList(id);
    const newList = this.state.listEntries.filter(item => item.id !== id);
    this.setState({ listEntries: newList });
  }

  render() {
    const { isLoading, error, listDisplayName, listEntries, isEditMode } = this.state;

    if (error) {
      return (
        <div className="container">
          <ErrorMessage>Something went wrong :(</ErrorMessage>
        </div>
      );
    }

    const { userId, listName } = this.props.match.params;
    const baseUrl = `/user/${userId}/${listName}`;
    const tabLinks = {
      All: `${baseUrl}/all`,
      Movies: `${baseUrl}/movie`,
      "TV Shows": `${baseUrl}/tv`,
    };

    return (
      <ResponsiveList
        isLoading={isLoading}
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
