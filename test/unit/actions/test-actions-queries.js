import chai from 'chai';
import createStore from '../../../app/store';
import { connect } from '../../../app/actions/connection';
import * as actions from '../../../app/actions/queries';
import * as selectors from '../../../app/selectors';
import * as utils from '../../utils';
import Query from '../../../app/models/query';

const expect = chai.expect;

describe('actions: queries', () => {
  let store;
  beforeEach(() => store = createStore());

  describe('query', () => {
    it('should fail if there is no connection', async () => {
      const { getState, dispatch } = store;
      const expected = 'Cannot execute query without a connection.';

      dispatch(actions.query('{ :db/doc }'));
      await utils.waitUntilState(store,
        state => selectors.getMostRecentError(state));

      expect(selectors.getMostRecentError(getState()).get('error')).to.be.equal(expected);
    });

    it('creates a query that loads', async () => {
      const { getState, dispatch } = store;

      dispatch(connect('http://dummy:8888', { dummy: true }));
      await utils.waitUntilState(store,
        state => selectors.getConnection(state));

      dispatch(actions.query(':q'));
      await utils.waitUntilState(store, [
        state => selectors.getQueries(state).size > 0,
        state => selectors.getMostRecentQuery(state).state === Query.STATES.LOADING,
        state => selectors.getMostRecentQuery(state).state === Query.STATES.LOADED,
      ]);

      const query = selectors.getMostRecentQuery(getState());

      expect(query.get('id')).to.be.a('number');
      expect(query.get('src')).to.be.equal(':q');
      expect(query.get('results')).to.be.ok;
      expect(query.get('state')).to.be.equal(Query.STATES.LOADED);
    });

    it('can create multiple queries and stores the last `MAX_QUERY_HISTORY` queries', async () => {
      const { getState, dispatch } = store;

      dispatch(connect('http://dummy:8888', { dummy: true }));
      await utils.waitUntilState(store,
        state => selectors.getConnection(state));

      // Ensure queriesCreatedCount is > MAX_QUERY_HISTORY so we can
      // test that we remove older queries
      const queriesCreatedCount = Query.MAX_QUERY_HISTORY + 5;

      let iterations = 0;
      while (iterations++ < queriesCreatedCount) {
        dispatch(actions.query(`:q=:${iterations}`));
      }

      await utils.waitUntilState(store, [
        state => selectors.getQueries(state).size > 0,
        // Wait until we get our last query added to the stack before checking
        state => selectors.getMostRecentQuery(state).src === `:q=:${queriesCreatedCount}`,
        state => selectors.getQueries(state).size === 5,
        state => selectors.getQueries(state).every(q => q.get('state') === Query.STATES.LOADED),
      ]);

      expect(selectors.getQueries(getState()).every(q => q.get('state') === Query.STATES.LOADED)).to.be.ok;
      expect(selectors.getQueries(getState()).size).to.be.equal(5);
      expect(selectors.getMostRecentQuery(getState()).get('src')).to.be.equal(`:q=:${queriesCreatedCount}`);
    });
  });
});
