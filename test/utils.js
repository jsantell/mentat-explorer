const wait = n => new Promise(resolve => setTimeout(resolve, n));

/**
 * Takes a Redux store and a function or an array of functions and returns
 * a promise when the predicate function returns truthy, attempted on
 * every state change. If an array of functions are passed in, then
 * the promise resolves once all predicates are satisfied in order.
 */
export const waitUntilState = async ({ getState, subscribe }, predicate) => {

  // Take either an array of functions or a single function
  const predicates = [].concat(predicate);
  let predicateIndex = 0;

  if (!predicates.length) {
    throw new Error('No predicates provided to waitUntilState');
  }

  await new Promise(resolve => {
    const unsubscribe = subscribe(() => {
      const state = getState();

      if (predicates[predicateIndex](state)) {
        if (++predicateIndex === predicates.length) {
          unsubscribe();
          resolve();
        }
      }
    });
  });
};
