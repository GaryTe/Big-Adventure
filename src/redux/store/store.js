import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer/root-reducer';

export const store = configureStore({
  reducer: rootReducer
});
