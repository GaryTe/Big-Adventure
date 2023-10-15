import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer/root-reducer';
import { userMiddeleware } from '../../user-middeleware/user-middeleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [userMiddeleware]
});
