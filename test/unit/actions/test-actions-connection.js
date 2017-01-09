import chai from 'chai';
import createStore from '../../../app/store';
import * as actions from '../../../app/actions/connection';
import * as selectors from '../../../app/selectors';
import Schema from '../../../app/models/schema';
import * as utils from '../../utils';

const expect = chai.expect;

describe('actions: connection', () => {
  describe('connect', () => {
    let store;
    beforeEach(() => store = createStore());

    it('should not have any connection by default', async () => {
      const { getState, dispatch } = store;
      expect(selectors.getConnection(getState())).to.be.equal(null);
    });

    it('sets the connection address', async () => {
      const { getState, dispatch } = store;
      const address = 'http://myaddress:8888';

      dispatch(actions.connect(address, { dummy: true }));
      await utils.waitUntilState(store,
        state => selectors.getConnectionAddress(state) === address);

      expect(selectors.getConnectionAddress(getState())).to.be.equal(address);
    });

    it('queries for the schema on connect', async () => {
      const { getState, dispatch } = store;
      const address = 'http://myaddress:8888';

      dispatch(actions.connect(address, { dummy: true }));

      await utils.waitUntilState(store, [
        state => selectors.getSchemaState(state) === Schema.STATES.LOADING,
        state => selectors.getSchemaState(state) === Schema.STATES.LOADED,
      ]);

      expect(selectors.getSchemaState(getState())).to.be.equal(Schema.STATES.LOADED);
      expect(selectors.getSchemaData(getState())).to.be.ok;
    });
  });
});
