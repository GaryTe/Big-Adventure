import { NameSpace } from '../../../const';
import { store } from '../../store/store';

export const getDataOffers = () => store.getState()[NameSpace.OFFERS];
