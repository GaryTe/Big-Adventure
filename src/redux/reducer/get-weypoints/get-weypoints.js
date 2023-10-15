import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import {
  updateDataWaypoint,
  updateDataWaypointList,
  filterWaypoints
} from '../../../utils/utils';

const initialState = {
  originalWaypointsList: null,
  waypointsList: null,
  dataWaypoints: {
    response: null,
    dataWaypoint: null,
    nameRadraw: null
  },
};

export const getWaypoints = createSlice({
  name: NameSpace.WAYPOINTS,
  initialState,
  reducers: {
    setWaypoints: (state, action) => {
      if(action.payload.dataPoints !== null) {
        state.originalWaypointsList = action.payload.dataPoints;
        state.waypointsList = action.payload.dataPoints;
      }
      if(action.payload.respons) {state.dataWaypoints.response = action.payload.respons;}

      state.dataWaypoints.nameRadraw = action.payload.valuePromise;
    },

    upgradeWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = updateDataWaypoint(originalWaypointsList, data);
      state.waypointsList = updateDataWaypoint(waypointsList, data);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        dataWaypoint: data,
        nameRadraw: nameRedraw
      };
    },

    addWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = [...originalWaypointsList, data];
      state.waypointsList = [...waypointsList, data];

      state.dataWaypoints = {
        ...state.dataWaypoints,
        nameRadraw: nameRedraw
      };
    },

    deleteWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = updateDataWaypointList(originalWaypointsList, data);
      state.waypointsList = updateDataWaypointList(waypointsList, data);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        dataWaypoint: data,
        nameRadraw: nameRedraw
      };
    },

    filterWaypointsEverything: (state, action) => {
      const {nameRedraw} = action.payload;
      const {originalWaypointsList} = state;

      state.waypointsList = [...originalWaypointsList];

      state.dataWaypoints = {
        ...state.dataWaypoints,
        nameRadraw: nameRedraw
      };
    },

    filterWaypointsFuture: (state, action) => {
      const {nameRedraw} = action.payload;
      const {waypointsList} = state;

      state.waypointsList = filterWaypoints(waypointsList);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        nameRadraw: nameRedraw
      };
    }
  }
});

export const {
  setWaypoints,
  upgradeWaypoint,
  addWaypoint,
  deleteWaypoint,
  filterWaypointsFuture,
  filterWaypointsEverything
} = getWaypoints.actions;
