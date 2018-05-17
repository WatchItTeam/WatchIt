import React, { Component } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";
import parseName from "../utils/parseName";
import ErrorMessage from "../components/ErrorMessage";
import { fetchAllFromList, removeFromList, sortBy } from "../Firebase/lists";

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

  componentWillUnmount() {
    this.unsubscribe();
  }

  async fetchList() {
    this.setState({ isLoading: true });
    const { userId, listName, mediaType } = this.props.match.params;
    this.unsubscribe = await fetchAllFromList(userId, listName, mediaType, (snapshot) => {
      const entries = snapshot.docs.map(doc => doc.data());
      const sorted = sortBy(entries, "title");
      this.setState({ listEntries: sorted, isLoading: false });
    });
  }

  toggleEditMode = () => {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  deleteEntry = (id) => {
    removeFromList(id)
      .then(() => {
        const newList = this.state.listEntries.filter(item => item.id !== id);
        this.setState({ listEntries: newList });
      }).catch(() => {
        this.setState({ error: true });
      });
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
        listUserId={userId}
      />
    );
  }
}

export default UserList;
