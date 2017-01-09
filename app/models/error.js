import Immutable from 'immutable';

let ERROR_INC = 0;

class Error extends Immutable.Record({
  id: null,
  error: null,
  timestamp: null,
  display: true,
}, 'Error') {
  constructor(data={}) {
    let error = data.error;
    if (typeof data.error !== 'string') {
      error = data.error.toString().replace(/^[A-Za-z]*Error\: /, '');
    }

    super({
      timestamp: Date.now(),
      error,
      id: ++ERROR_INC,
    });
  }
};

export default Error;
