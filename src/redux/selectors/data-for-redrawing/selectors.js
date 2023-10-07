import { store } from '../../store/store';
import { NameSpace } from '../../../const';

export const getDataWaypoints = () => store.getState()[NameSpace.WAYPOINTS].dataWaypoints;
