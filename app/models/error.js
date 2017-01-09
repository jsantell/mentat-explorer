import Immutable from 'immutable';

class Error extends Immutable.Record({
  error: null,
  timestamp: null,
}, 'Error') {
  constructor(data={}) {
    let error = data.error;
    if (typeof data.error !== 'string') {
      error = data.error.toString().replace(/^Error\: /, '');
    }

    super({ timestamp: Date.now(), error });
  }
};

export default Error;
