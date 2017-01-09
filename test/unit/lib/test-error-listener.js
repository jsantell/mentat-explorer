import chai from 'chai';
import createStore from '../../../app/store';
import errorListener from '../../../app/lib/error-listener';
import * as actions from '../../../app/actions/ui';
import * as selectors from '../../../app/selectors';
import * as utils from '../../utils';

const expect = chai.expect;

describe('lib: error-listener', () => {

  it('subsequently fires to hide errors after they have been created', async () => {
    const store = createStore();
    const { getState, dispatch } = store;
    const unsubscribe = errorListener(store);

    dispatch(actions.createError(new Error('e')));

    await utils.waitUntilState(store, [
      state => selectors.getErrors(state).size > 0 &&
               selectors.getMostRecentError(state).get('display') === true,
      state => selectors.getMostRecentError(state).get('display') === false,
    ]);

    expect(selectors.getMostRecentError(getState()).get('display')).to.be.equal(false);
    unsubscribe();
  });
});
