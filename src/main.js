import MinePresenter from './presenter/mine-presenter';
import { points } from './mock-data/point';
import { store } from './redux/store/store';
import { setWaypoints } from './redux/reducer/get-weypoints/get-weypoints';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortingContainer = document.querySelector('.trip-events');
const buttonNewEventContainer = document.querySelector('.trip-main');

store.dispatch(setWaypoints(points));

const minePresenter = new MinePresenter(
  filterContainer,
  sortingContainer,
  buttonNewEventContainer
);
minePresenter.init();
