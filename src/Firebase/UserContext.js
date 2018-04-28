import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import firebaseApp from "./firebase";

const { Provider, Consumer: UserConsumer } = createContext();

/**
 * This component allows you to *magically* access the current logged in user
 * without having to pass down any props.
 * The Provider component sends the user value down, and the consumer allows
 * you to actually use it.
 */
class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    user: null,
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <Provider value={this.state.user}>
        {this.props.children}
      </Provider>
    );
  }
}

/**
 * Wrap your component with this function to get the current user
 * as a prop in the component.
 *
 * Usage:
 * export default withUser(YourComponent);
 */
function withUser(Comp) {
  return function ComponentWithUser(props) {
    return (
      <UserConsumer>
        {user => <Comp {...props} user={user} />}
      </UserConsumer>
    );
  };
}

export { UserProvider, withUser };
