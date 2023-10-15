import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';

const initialState = {
  valueRedraw: null,
  destinationsList: null,
  respons: null
};

export const getDestinations = createSlice({
  name: NameSpace.DESTINATIONS,
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      if(action.payload.dataDestinations !== null) {
        state.destinationsList = action.payload.dataDestinations;
      }

      if(action.payload.respons) {state.respons = action.payload.respons;}

      state.valueRedraw = action.payload.valuePromise;
    }
  }
});

export const {setDestinations} = getDestinations.actions;
