import Cookies from 'js-cookie';

/**
 * Gets all cookies.
 * @returns An object containing all cookies.
 */
export function getCookies(): { [key: string]: string } {
  return Cookies.get();
}

/**
 * Sets a cookie.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param options Optional settings for the cookie.
 */
export function setCookie(name: string, value: string, options?: Cookies.CookieAttributes) {
  Cookies.set(name, value, options);
}

/**
 * Gets a cookie.
 * @param name The name of the cookie.
 * @returns The value of the cookie, or undefined if the cookie does not exist.
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

/**
 * Removes a cookie.
 * @param name The name of the cookie.
 * @param options Optional settings for the cookie.
 */
export function removeCookie(name: string, options?: Cookies.CookieAttributes) {
  Cookies.remove(name, options);
}

/**
 * Clears all cookies.
 */
export function clearCookies() {
  const all = getCookies();
  for(const cookieName in all) {
    if(Object.prototype.hasOwnProperty.call(all, cookieName)) {
      Cookies.remove(cookieName);
    }
  }
}
