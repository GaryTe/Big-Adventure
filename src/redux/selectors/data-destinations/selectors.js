import { store } from '../../store/store';
import { NameSpace } from '../../../const';

export const getDataDestinations = () => store.getState()[NameSpace.DESTINATIONS];
