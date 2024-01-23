import * as actions from '../../actions';

describe('actions', () => {
  it('should create an action to fetch data', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'CHANGE_DATA',
      data,
    };
    expect(actions.fetchData(data)).toEqual(expectedAction);
  });
  it('should create an action to fetch ngrams', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'CHANGE_NGRAMS',
      data,
    };
    expect(actions.fetchNgrams(data)).toEqual(expectedAction);
  });
  it('should create an action to change error', () => {
    const data = 'error';
    const expectedAction = {
      type: 'CHANGE_ERROR',
      data,
    };
    expect(actions.changeError(data)).toEqual(expectedAction);
  });
  it('should create an action to change loading value', () => {
    const data = false;
    const expectedAction = {
      type: 'CHANGE_LOADING',
      data,
    };
    expect(actions.changeLoading(data)).toEqual(expectedAction);
  });
  it('should create an action to change the user selected year', () => {
    const data = 2014;
    const expectedAction = {
      type: 'CHANGE_SELECT_YEAR',
      data,
    };
    expect(actions.changeYear(data)).toEqual(expectedAction);
  });
  it('should create an action to change user selected word', () => {
    const data = 'dog';
    const expectedAction = {
      type: 'CHANGE_SELECT_WORD',
      data,
    };
    expect(actions.changeSelectWord(data)).toEqual(expectedAction);
  });
  it('should create an action to post new publication to database', () => {
    const newPub = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'POST_PUB',
      newPub,
    };
    expect(actions.postPubAction(newPub)).toEqual(expectedAction);
  });
  it('should create an action to request doi info from API', () => {
    const newPub = '10.555/9999';
    const expectedAction = {
      type: 'REQUEST_DOI_INFO',
      newPub,
    };
    expect(actions.requestDoiInfo(newPub)).toEqual(expectedAction);
  });
  it('should create an action to change doi info', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'CHANGE_DOI_INFO',
      data,
    };
    expect(actions.fetchDoiInfo(data)).toEqual(expectedAction);
  });
  it('should create an action to fetch data', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'UPDATE_DOI_INFO',
      data,
    };
    expect(actions.changeDoiInfo(data)).toEqual(expectedAction);
  });
  it('should create an action to update keycloak credentials', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'UPDATE_KEYCLOAK',
      data,
    };
    expect(actions.changeKeycloak(data)).toEqual(expectedAction);
  });
  it('should create an action to fetch data', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'FETCH_DOI_FAILURE',
      data,
    };
    expect(actions.changeDoiFailure(data)).toEqual(expectedAction);
  });
  it('should create an action to fetch data', () => {
    const data = [{ title: 'test', author: 'Maura' }];
    const expectedAction = {
      type: 'UPDATE_ADD_SUCCESS',
      data,
    };
    expect(actions.changeAddSuccess(data)).toEqual(expectedAction);
  });
});
