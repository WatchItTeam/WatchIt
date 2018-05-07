import firebaseApp, { db } from "./firebase";
import { normalizeMovie } from "../api/APIUtils";

const getUserID = () => firebaseApp.auth().currentUser.uid;

/**
 * Adds a movie to a list
 * @param {Object} mov The movie to add
 * @param {String} watchStatus "watching", "plan_to_watch", "completed", "dropped"
 * @returns {Promise}
 */
export function addToList(mov, watchStatus = "plan_to_watch") {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");

  // we don't need to store credits, recommendations or videos (to save space in database)
  // so we destructure them out, and the movie variable contains the
  // rest of the info that we want to save
  const { credits, recommendations, videos, ...movie } = normalizeMovie(mov);
  return db.doc(`users/${user}/list/${movie.id}`).set({
    watch_status: watchStatus,
    ...movie,
  });
}

// this is just here for now so ESLint doesn't complain about prefer-default-export
export const lol = "lol";
