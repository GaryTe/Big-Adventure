import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';

const initialState = {
  valueRedraw: null,
  offersList: null,
  respons: null
};

export const getOffers = createSlice({
  name: NameSpace.OFFERS,
  initialState,
  reducers: {
    setOffers: (state, action) => {
      if(action.payload.dataOffers !== null) {
        state.offersList = action.payload.dataOffers;
      }

      if(action.payload.respons) {state.respons = action.payload.respons;}

      state.valueRedraw = action.payload.valuePromise;
    }
  }
});

export const {setOffers} = getOffers.actions;
