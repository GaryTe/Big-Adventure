import { combineReducers } from '@reduxjs/toolkit';
import { getWaypoints } from '../reducer/get-weypoints/get-weypoints';
import { NameSpace } from '../../const';

export const rootReducer = combineReducers({
  [NameSpace.WAYPOINTS]: getWaypoints.reducer
});
