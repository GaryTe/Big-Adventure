import { combineReducers } from '@reduxjs/toolkit';
import { getWaypoints } from '../reducer/get-weypoints/get-weypoints';
import { getDestinations } from '../reducer/get-destinations/get-destinations';
import { getOffers } from '../reducer/get-offers/get-offers';
import { NameSpace } from '../../const';

export const rootReducer = combineReducers({
  [NameSpace.WAYPOINTS]: getWaypoints.reducer,
  [NameSpace.DESTINATIONS]: getDestinations.reducer,
  [NameSpace.OFFERS]: getOffers.reducer
});
