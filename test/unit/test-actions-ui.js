import chai from 'chai';
import createStore from '../../app/store';
import * as actions from '../../app/actions/ui';
import * as selectors from '../../app/selectors';
import Schema from '../../app/models/schema';
import * as utils from '../utils';

const expect = chai.expect;

describe('actions: ui', () => {
  let store;
  beforeEach(() => store = createStore());

  describe('showCreateConnectionModel()', () => {
    it('should toggle create connection modal on', async () => {
      const { getState, dispatch } = store;
      expect(selectors.showCreateConnectionModal(getState())).to.be.equal(false);
      dispatch(actions.showCreateConnectionModal());

      await utils.waitUntilState(store,
        state => selectors.showCreateConnectionModal(state) === true);
      expect(selectors.showCreateConnectionModal(getState())).to.be.equal(true);
    });
  });

  describe('hideCreateConnectionModel()', () => {
    it('should toggle create connection modal off', async () => {
      const { getState, dispatch } = store;
      expect(selectors.showCreateConnectionModal(getState())).to.be.equal(false);
      dispatch(actions.showCreateConnectionModal());

      await utils.waitUntilState(store,
        state => selectors.showCreateConnectionModal(state) === true);
      expect(selectors.showCreateConnectionModal(getState())).to.be.equal(true);

      dispatch(actions.hideCreateConnectionModal());
      await utils.waitUntilState(store,
        state => selectors.showCreateConnectionModal(state) === false);
      expect(selectors.showCreateConnectionModal(getState())).to.be.equal(false);
    });
  });

  describe('createError()', () => {
    it('should create an error with string and timestamp', async () => {
      const { getState, dispatch } = store;
      const errorStr = 'This is an error';

      expect(selectors.getErrors(getState()).size).to.be.equal(0);
      dispatch(actions.createError(new Error(errorStr)));

      await utils.waitUntilState(store,
        state => selectors.getErrors(state).size > 0)
      expect(selectors.getErrors(getState()).size).to.be.equal(1);

      const error = selectors.getMostRecentError(getState());
      expect(error.error).to.be.a('string');
      expect(error.error).to.be.equal(errorStr);
      expect(error.timestamp).to.be.at.most(Date.now());
    });

    it('should create a history of errors', async () => {
      const { getState, dispatch } = store;

      expect(selectors.getErrors(getState()).size).to.be.equal(0);
      dispatch(actions.createError(new Error('1')));
      dispatch(actions.createError(new Error('2')));
      dispatch(actions.createError(new Error('3')));

      await utils.waitUntilState(store,
        state => selectors.getErrors(state).size === 3)
      expect(selectors.getErrors(getState()).size).to.be.equal(3);

      const error = selectors.getMostRecentError(getState());
      expect(error.error).to.be.equal('3');
    });

    it('should accept a string or an error object', async () => {
      const { getState, dispatch } = store;

      expect(selectors.getErrors(getState()).size).to.be.equal(0);

      dispatch(actions.createError(new Error('1')));
      await utils.waitUntilState(store,
        state => selectors.getErrors(state).size === 1)
      expect(selectors.getMostRecentError(getState()).error).to.be.equal('1');

      dispatch(actions.createError('2'));
      await utils.waitUntilState(store,
        state => selectors.getErrors(state).size === 2)
      expect(selectors.getMostRecentError(getState()).error).to.be.equal('2');
    });
  });
});
