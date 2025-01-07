/**
 * Checks if two values are equal.
 * @param value1 The first value.
 * @param value2 The second value.
 * @returns True if the values are equal, false otherwise.
 */
function equals(value1: any, value2: any): boolean {
  if(value1 === value2) {
    return true;
  }

  if(value1 === null || value2 === null) {
    return false;
  }

  if(Array.isArray(value1) && Array.isArray(value2)) {
    if(value1.length !== value2.length) {
      return false;
    }
    for(let i = 0; i < value1.length; i++) {
      if(!equals(value1[i], value2[i])) {
        return false;
      }
    }
    return true;
  }

  if(typeof value1 !== 'object' || typeof value2 !== 'object') {
    return false;
  }

  const value1Props = Object.getOwnPropertyNames(value1);
  const value2Props = Object.getOwnPropertyNames(value2);

  if(value1Props.length !== value2Props.length) {
    return false;
  }

  for(let i = 0; i < value1Props.length; i++) {
    const prop = value1Props[i];
    if(!equals(value1[prop], value2[prop])) {
      return false;
    }
  }

  return true;
}

export default equals;
