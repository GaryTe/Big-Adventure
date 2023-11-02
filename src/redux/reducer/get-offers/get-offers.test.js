import { getOffers, setOffers } from './get-offers';

describe('Test function reducer "getOffers"', () => {

  const state = {
    valueRedraw: null,
    offersList: null,
    respons: null
  };

  test(`Call a function reducer "setOffers" that returns "const response =
  {
    valuePromise: 'PATCH_UPDATE',
    dataOffers: [{}, {}, {}],
    respons: 'FULFILLED'
  }"`, () => {

    expect(getOffers.reducer(state, setOffers({
      valuePromise: 'PATCH_UPDATE',
      dataOffers: [{}, {}, {}],
      respons: 'FULFILLED'
    }))).toEqual(
      {
        valueRedraw: 'PATCH_UPDATE',
        offersList: [{}, {}, {}],
        respons: 'FULFILLED'
      }
    );
  });
});
