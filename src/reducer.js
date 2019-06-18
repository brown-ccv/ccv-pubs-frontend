import Immutable from 'seamless-immutable';

const initialState = Immutable({
  publications: []
});


export default function reduce(state = initialState, action = {}) {

  switch (action.type) {
    case 'CHANGE_DATA':
      return state.merge({
        publications: action.data
      });
    case 'CHANGE_ERROR':
      return state.merge({
        string: action.data //no more string
      });
    default:
      return state;
  }
}

export function getData(state) {
  return state.publications;
}

export function getError(state) {
  return state.string;
}
