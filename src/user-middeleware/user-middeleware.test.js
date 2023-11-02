import { configureMockStore } from '@jedmao/redux-mock-store';
import { userMiddeleware } from './user-middeleware';

describe('Test middeleware "userMiddeleware"', () => {

  const mockFunction = jest.fn((text) => text);

  const middlewares = [userMiddeleware];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  test('In middeleware do not pass object action; pass function and result response "Function completed !!!"', () => {

    store.dispatch(() => mockFunction('Function completed !!!'));
    expect(mockFunction.mock.results[0].value).toBe('Function completed !!!');
  });

  test('In middeleware pass object action and result response "Action completed !!!"', () => {

    const action = {type: 'ACTION'};
    const subscribe = store.subscribe(() => mockFunction('Action completed !!!'));

    store.dispatch(action);
    expect(store.getActions()[0]).toBe(action);
    expect(mockFunction.mock.results[1].value).toBe('Action completed !!!');

    subscribe();
  });
});
