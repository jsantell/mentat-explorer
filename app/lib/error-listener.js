import * as selectors from '../selectors';
import * as actions from '../actions/ui';

const ERROR_HIDE_DELAY = process.env.NODE_ENV === 'test' ? 10 : 4000;

export default function errorListener ({ getState, dispatch, subscribe }) {
  let index = 0;
  const unsubscribe = subscribe(() => {
    const errors = selectors.getErrors(getState());

    while (errors.size !== index) {
      const id = errors.get(index++).get('id');
      setTimeout(() => dispatch(actions.hideError(id)), ERROR_HIDE_DELAY);
    }
  });

  return unsubscribe;
}
