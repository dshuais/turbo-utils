/**
 * Checks if value is empty.
 *
 * Checks if value is empty. A value is considered empty unless it’s an arguments object, array, string, or
 * jQuery-like collection with a length greater than 0 or an object with own enumerable properties.
 *
 * @param value The value to inspect.
 * @return Returns true if value is empty, else false.
 */
export function isEmpty(value: any): boolean {
  if(value === null || value === undefined) return true;

  if(typeof value === 'string' && value.trim() === '') return true;

  if(Array.isArray(value) && value.length === 0) return true;

  if(typeof value === 'object' && Object.keys(value).length === 0) return true;

  if(typeof value === 'number' && value === 0) return true;

  if(typeof value === 'undefined') return true;

  if(value instanceof Map && value.size === 0) return true;

  if(value instanceof Set && value.size === 0) return true;

  return false;
}
