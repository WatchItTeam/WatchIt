import firebaseApp, { db } from "./firebase";
import { normalizeMovie } from "../api/APIUtils";

// watching status variables
export const watchStates = {
  watching: "watching",
  planToWatch: "plan_to_watch",
  completed: "completed",
  dropped: "dropped",
};

const getUserID = () => firebaseApp.auth().currentUser.uid;

/**
 * Adds a movie to a list
 * @param {Object} mov The movie to add
 * @param {String} watchStatus "watching", "plan_to_watch", "completed", "dropped"
 * @returns {Promise}
 */
export function addToList(mov, watchStatus = watchStates.planToWatch) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");

  // we don't need to store credits, recommendations or videos (to save space in database)
  // so we destructure them out, and the movie variable contains the
  // rest of the info that we want to save
  const { credits, recommendations, videos, ...movie } = normalizeMovie(mov);
  return db.doc(`users/${user}/list/${movie.id}`).set({
    watch_status: watchStatus,
    added: new Date(),
    ...movie,
  });
}

/**
 * Fetches list entries from the database
 */
export async function fetchAllFromList(userId, watchStatus, mediaType) {
  let req;
  if (mediaType === "all") {
    req = await db.collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus);
  } else {
    req = await db.collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus)
      .where("media_type", "==", mediaType);
  }
  const snapShots = await req.get();

  const entries = snapShots.docs.map(doc => doc.data());
  return entries;
}

/**
 * Fetches one specific movie/show from a user's list
 */
export function fetchOneFromList(userId, movieId) {
  return db.doc(`/users/${userId}/list/${movieId}`)
    .get()
    .then(doc => doc.data());
}
