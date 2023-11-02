import {
  getWaypoints,
  setWaypoints,
  upgradeWaypoint,
  addWaypoint,
  deleteWaypoint,
  filterWaypointsEverything,
  filterWaypointsFuture
} from './get-weypoints';

describe('Test function reducer "getWaypoints"', () => {

  let state = {
    originalWaypointsList: null,
    waypointsList: null,
    dataWaypoints: {
      response: null,
      dataWaypoint: null,
      nameRadraw: null
    },
  };

  test(`Call a function reducer "setWaypoints" that returns
  "{
    originalWaypointsList: [{}, {}, {}],
    waypointsList: [{}, {}, {}],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: null,
      nameRadraw: 'PATCH_UPDATE'
    }
  }"`, () => {

    expect(getWaypoints.reducer(state, setWaypoints({
      dataPoints: [{}, {}, {}],
      respons: 'FULFILLED',
      valuePromise: 'PATCH_UPDATE'
    }))).toEqual({
      originalWaypointsList: [{}, {}, {}],
      waypointsList: [{}, {}, {}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: null,
        nameRadraw: 'PATCH_UPDATE'
      }
    });
  });

  test(`Call a function reducer "upgradeWaypoint" that returns
  "{
    originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: {id: 2, name: 'Vlad'},
      nameRadraw: 'PATCH_UPDATE'
    }
  }"`, () => {

    state = {
      originalWaypointsList: [{id: 1}, {id: 2}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2}, {id: 3}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: null,
        nameRadraw: null
      }
    };

    expect(getWaypoints.reducer(state, upgradeWaypoint({
      data: {id: 2, name: 'Vlad'},
      nameRedraw: 'PATCH_UPDATE'
    }))).toEqual({
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 2, name: 'Vlad'},
        nameRadraw: 'PATCH_UPDATE'
      }
    });
  });

  test(`Call a function reducer "addWaypoint" that returns
  "{
    originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
    waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: {id: 2, name: 'Vlad'},
      nameRadraw: 'PATCH'
    }
  }"`, () => {

    state = {
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 2, name: 'Vlad'},
        nameRadraw: 'PATCH_UPDATE'
      }
    };

    expect(getWaypoints.reducer(state, addWaypoint({
      data: {id: 4, name: 'Aleg'},
      nameRedraw: 'PATCH'
    }))).toEqual({
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 2, name: 'Vlad'},
        nameRadraw: 'PATCH'
      }
    });
  });

  test(`Call a function reducer "deleteWaypoint" that returns
  "{
    originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: {id: 4, name: 'Aleg'},
      nameRadraw: 'PATCH'
    }
  }"`, () => {

    state = {
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}, {id: 4, name: 'Aleg'}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 2, name: 'Vlad'},
        nameRadraw: 'PATCH'
      }
    };

    expect(getWaypoints.reducer(state, deleteWaypoint({
      data: {id: 4, name: 'Aleg'},
      nameRedraw: 'PATCH'
    }))).toEqual({
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 4, name: 'Aleg'},
        nameRadraw: 'PATCH'
      }
    });
  });

  test(`Call a function reducer "filterWaypointsEverything" that returns
  "{
    originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: {id: 4, name: 'Aleg'},
      nameRadraw: 'PATCH'
    }
  }"`, () => {

    state = {
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 4, name: 'Aleg'},
        nameRadraw: 'PATCH'
      }
    };

    expect(getWaypoints.reducer(state, filterWaypointsEverything({
      nameRedraw: 'PATCH'
    }))).toEqual({
      originalWaypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      waypointsList: [{id: 1}, {id: 2, name: 'Vlad'}, {id: 3}],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 4, name: 'Aleg'},
        nameRadraw: 'PATCH'
      }
    });
  });

  test(`Call a function reducer "filterWaypointsFuture" that returns
  "{
    originalWaypointsList: [{}, {}, {}],
    waypointsList: [{
      basePrice: 1100,
      dateFrom: '2023-11-05T00:14:26.816Z',
      dateTo: '2023-11-05T12:35:17.223Z',
      destination: 20,
      id: '16',
      isFavorite: true,
      offers: [1, 2, 3],
      type: 'flight'
    },
    {
      basePrice: 600,
      dateFrom: '2023-11-11T02:27:22.451Z',
      dateTo: '2023-11-15T21:33:35.012Z',
      destination: 20,
      id: '8',
      isFavorite: false,
      offers: [1, 4, 5],
      type: 'flight'
    },
    {
      basePrice: 800,
      dateFrom: '2023-12-01T22:50:42.984Z',
      dateTo: '2023-12-05T04:10:48.047Z',
      destination: 8,
      id: '0',
      isFavorite: true,
      offers: [1, 2, 3],
      type: 'bus'
    }],
    dataWaypoints: {
      response: 'FULFILLED',
      dataWaypoint: {id: 4, name: 'Aleg'},
      nameRadraw: 'PATCH'
    }
  }"`, () => {

    state = {
      originalWaypointsList: [{}, {}, {}],
      waypointsList: [
        {
          basePrice: 600,
          dateFrom: '2023-11-11T02:27:22.451Z',
          dateTo: '2023-11-15T21:33:35.012Z',
          destination: 20,
          id: '8',
          isFavorite: false,
          offers: [1, 4, 5],
          type: 'flight'
        },
        {
          basePrice: 800,
          dateFrom: '2023-12-01T22:50:42.984Z',
          dateTo: '2023-12-05T04:10:48.047Z',
          destination: 8,
          id: '0',
          isFavorite: true,
          offers: [1, 2, 3],
          type: 'bus'
        },
        {
          basePrice: 1100,
          dateFrom: '2023-11-05T00:14:26.816Z',
          dateTo: '2023-11-05T12:35:17.223Z',
          destination: 20,
          id: '16',
          isFavorite: true,
          offers: [1, 2, 3],
          type: 'flight'
        }
      ],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 4, name: 'Aleg'},
        nameRadraw: 'PATCH'
      }
    };

    expect(getWaypoints.reducer(state, filterWaypointsFuture({
      nameRedraw: 'PATCH'
    }))).toEqual({
      originalWaypointsList: [{}, {}, {}],
      waypointsList: [
        {
          basePrice: 1100,
          dateFrom: '2023-11-05T00:14:26.816Z',
          dateTo: '2023-11-05T12:35:17.223Z',
          destination: 20,
          id: '16',
          isFavorite: true,
          offers: [1, 2, 3],
          type: 'flight'
        },
        {
          basePrice: 600,
          dateFrom: '2023-11-11T02:27:22.451Z',
          dateTo: '2023-11-15T21:33:35.012Z',
          destination: 20,
          id: '8',
          isFavorite: false,
          offers: [1, 4, 5],
          type: 'flight'
        },
        {
          basePrice: 800,
          dateFrom: '2023-12-01T22:50:42.984Z',
          dateTo: '2023-12-05T04:10:48.047Z',
          destination: 8,
          id: '0',
          isFavorite: true,
          offers: [1, 2, 3],
          type: 'bus'
        }
      ],
      dataWaypoints: {
        response: 'FULFILLED',
        dataWaypoint: {id: 4, name: 'Aleg'},
        nameRadraw: 'PATCH'
      }
    });
  });
});
