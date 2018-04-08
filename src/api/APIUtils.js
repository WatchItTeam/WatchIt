/**
 * This file contains helper functions to use TheMovieDB API
 */

const baseImgUrl = "https://image.tmdb.org/t/p/";

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
