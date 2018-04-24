/**
 * This file contains helper functions to use TheMovieDB API
 */
import API_KEY from "./APIkey";

const baseImgUrl = "https://image.tmdb.org/t/p/";

const baseUrl = "https://api.themoviedb.org/3";

const API_ERROR_CODE = 7;

/**
 * Takes the poster_path or backdrop_path value from the API and an optional
 * size parameter and returns the full image URL.
 * See https://api.themoviedb.org/3/configuration?api_key=YOURKEY for
 * examples of image sizes
 */
export const getFullImgPath = (imgPath, size = "original") => `${baseImgUrl}${size}${imgPath}`;

/**
 * Takes a full date in the format YYYY-MM-DD and returns the year
 */
export const getYearFromDate = fullDate => fullDate.substring(0, 4);

/**
 * Takes a response from a fetch, verifies it, and returns the JSON
 * @param {Promise} res
 */
async function checkResponse(res) {
  const json = await res.json();
  if (json.status_code === API_ERROR_CODE) throw new Error();

  return json;
}

export function getNowPlayingMovies() {
  const nowPlayingMovieUrl = `${baseUrl}/movie/now_playing?api_key=${API_KEY}&language=SE&page=1`;
  return fetch(nowPlayingMovieUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowAiringTVShows() {
  const nowAiringTVShowsUrl = `${baseUrl}/tv/on_the_air?api_key=${API_KEY}&language=SE&page=1`;
  return fetch(nowAiringTVShowsUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getMovieInfo(id) {
  const currentMovieUrl = `${baseUrl}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,recommendations`;
  return fetch(currentMovieUrl)
    .then(checkResponse);
}

export async function multiSearch(query, page = 1) {
  const multiSearchUrl = `${baseUrl}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`;
  const res = await fetch(multiSearchUrl);
  return checkResponse(res);
}
