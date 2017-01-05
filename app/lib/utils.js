/**
 * Turns a constant full of null values and assigns each
 * value to be the stringified version of the key
 */
export const constantify = obj => Object.keys(obj).reduce((o, prop) => {
  o[prop] = prop;
  return o;
}, obj);
