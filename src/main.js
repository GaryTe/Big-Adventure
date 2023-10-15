import MinePresenter from './presenter/mine-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortingContainer = document.querySelector('.trip-events');
const buttonNewEventContainer = document.querySelector('.trip-main');


const minePresenter = new MinePresenter(
  filterContainer,
  sortingContainer,
  buttonNewEventContainer
);

minePresenter.init();
