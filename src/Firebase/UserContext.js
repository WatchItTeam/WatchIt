import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import firebaseApp from "./firebase";

const { Provider, Consumer: UserConsumer } = createContext();

/**
 * This component allows you to *magically* access the current logged in user
 * without having to pass down any props.
 * The Provider component sends the user value down, and the consumer allows
 * you to actually use it.
 *
 * The user object will have status "loading", "signedIn" or "signedOut"
 * depending on its state.
 */
export class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    user: {
      status: "loading",
    },
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      const status = user ? "signedIn" : "signedOut";
      const userObj = { ...user, status };
      this.setState({ user: userObj });
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
export function withUser(Comp) {
  return function ComponentWithUser(props) {
    return (
      <UserConsumer>
        {user => <Comp {...props} user={user} />}
      </UserConsumer>
    );
  };
}