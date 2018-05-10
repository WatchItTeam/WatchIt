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
 * Adds a movie to a list.
 * Returns a promise that resolves if succesful.
 *
 * Usage:
 * addToList(movie, watchStatus)
 *  .then(() => {  // <-- note that there is no resolved value in the then
 *    // success
 *  }).catch((error) => {
 *    // failed
 *  })
 *
 * or:
 * try {
 *  await addToList(movie, watchStatus);
 *  // success
 * } catch (error) {
 *  // failed
 * }
 *
 * @param {Object} mov The movie to add
 * @param {String} watchStatus "watching", "plan_to_watch", "completed", "dropped"
 * @returns {Promise}
 */
export function addToList(movie, watchStatus = watchStates.planToWatch) {
  /* eslint-disable camelcase */
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");

  // we don't need to save the _entire_ movie object, so we pick out the
  // properties we want in order to save space and speed up read/writes
  const {
    id, media_type, title, poster_path, release_date, release_year, vote_average,
  } = normalizeMovie(movie);
  return db.doc(`users/${user}/list/${id}`).set({
    watch_status: watchStatus,
    added: new Date(),
    id,
    media_type,
    title,
    poster_path,
    release_date,
    release_year,
    vote_average,
  });
}

/**
 * Fetches list entries from the database, returns a promise that resolves
 * to an array of movies.
 *
 * Usage:
 * fetchAllFromList(...)
 *  .then((list) => ...)
 *  .catch((error) => ...)
 *
 * or:
 *
 * try {
 *  const list = await fetchAllFromList(...)
 * } catch (error) {
 *  ...
 * }
 */
export async function fetchAllFromList(userId, watchStatus, mediaType) {
  let req;
  if (mediaType === "all") {
    req = await db.collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus)
      .orderBy("title");
  } else {
    req = await db.collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus)
      .where("media_type", "==", mediaType)
      .orderBy("title");
  }
  const snapShots = await req.get();

  const entries = snapShots.docs.map(doc => doc.data());
  return entries;
}

/**
 * Fetches one specific movie/show from a user's list.
 * Returns a promise that resolves to the movie (if exits) or null.
 */
export function fetchOneFromList(userId, movieId) {
  return db.doc(`/users/${userId}/list/${movieId}`)
    .get()
    .then(doc => doc.data());
}
