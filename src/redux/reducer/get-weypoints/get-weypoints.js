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
    waypoints: null,
    waypoint: null,
    valueRedraw: null
  },
};

export const getWaypoints = createSlice({
  name: NameSpace.WAYPOINTS,
  initialState,
  reducers: {
    setWaypoints: (state, action) => {
      state.originalWaypointsList = action.payload;
      state.waypointsList = action.payload;
    },

    upgradeWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = updateDataWaypoint(originalWaypointsList, data);
      state.waypointsList = updateDataWaypoint(waypointsList, data);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        waypoint: data,
        valueRedraw: nameRedraw
      };
    },

    addWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = [...originalWaypointsList, data];
      state.waypointsList = [...waypointsList, data];

      state.dataWaypoints = {
        ...state.dataWaypoints,
        valueRedraw: nameRedraw
      };
    },

    deleteWaypoint: (state, action) => {
      const {nameRedraw, data} = action.payload;
      const {originalWaypointsList, waypointsList} = state;

      state.originalWaypointsList = updateDataWaypointList(originalWaypointsList, data);
      state.waypointsList = updateDataWaypointList(waypointsList, data);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        waypoint: data,
        valueRedraw: nameRedraw
      };
    },

    filterWaypointsEverything: (state, action) => {
      const {nameRedraw} = action.payload;
      const {originalWaypointsList} = state;

      state.waypointsList = [...originalWaypointsList];

      state.dataWaypoints = {
        ...state.dataWaypoints,
        valueRedraw: nameRedraw
      };
    },

    filterWaypointsFuture: (state, action) => {
      const {nameRedraw} = action.payload;
      const {waypointsList} = state;

      state.waypointsList = filterWaypoints(waypointsList);

      state.dataWaypoints = {
        ...state.dataWaypoints,
        valueRedraw: nameRedraw
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
