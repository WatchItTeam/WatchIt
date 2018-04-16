/* eslint-disable func-names, prefer-rest-params */
/**
 * This creates a debounced version of a function.
 *
 * Example usage:
 * Create the debounced version of search(query):
 *
 * const debouncedSearch = createDebouncedFunc((query) => {
 *   search(query);
 * }, 1000);
 *
 * Then to use it:
 *
 * functionThatGetsCalledOften(query) {
 *   debouncedSearch(query);
 * }
 *
 * @export
 * @param {any} fn
 * @param {any} time
 * @returns
 */
export default function createDebouncedFunc(fn, time) {
  let timeout;

  return function () {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}
