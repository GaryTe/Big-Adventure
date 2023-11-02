import {getDestinations, setDestinations} from './get-destinations';

describe('Test function reducer "getDestinations"', () => {

  const state = {
    valueRedraw: null,
    destinationsList: null,
    respons: null
  };

  test(`Call a function reducer "setDestinations" that returns
  "{
    valueRedraw: 'PATCH_UPDATE',
    destinationsList: [{}, {}, {}],
    respons: 'FULFILLED'
  }"`,
  () => {

    expect(getDestinations.reducer(state, setDestinations({
      valuePromise: 'PATCH_UPDATE',
      dataDestinations: [{}, {}, {}],
      respons: 'FULFILLED'
    }))).toEqual(
      {
        valueRedraw: 'PATCH_UPDATE',
        destinationsList: [{}, {}, {}],
        respons: 'FULFILLED'
      }
    );
  });
});
