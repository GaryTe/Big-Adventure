import { NameSpace } from '../../../const';
import { store } from '../../store/store';

export const getWaypointsList = () => store.getState()[NameSpace.WAYPOINTS].waypointsList;
