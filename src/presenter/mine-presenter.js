import FilterView from '../view/filter-view';
import SortingView from '../view/sorting-view';
import ContainerForContentView from '../view/container-for-content-view';
import WaypointPresenter from './waypoint-presenter';
import CreatNewEventPresenter from './creat-new-event-presenter';
import {
  render,
  RenderPosition
} from '../framework/render';
import {
  TypeSort,
  TypeFilter,
  TypeAction,
  TypeRedraw
} from '../const';
import {
  sortWaypointsDown,
} from '../utils/utils';
import { getWaypointsList } from '../redux/selectors/data-waypoints/selectors';
import { getDataWaypoints } from '../redux/selectors/data-for-redrawing/selectors';
import {
  upgradeWaypoint,
  addWaypoint,
  deleteWaypoint,
  filterWaypointsFuture,
  filterWaypointsEverything
} from '../redux/reducer/get-weypoints/get-weypoints';
import { store } from '../redux/store/store';

export default class MinePresenter {
  #minePresenter = null;
  #sortingContainer = null;
  #buttonNewEventContainer = null;
  #creatNewEventPresenter = null;
  #filter = null;
  #elementSort = null;
  #containerForContent = new ContainerForContentView();
  #waypointsPresenterList = new Map();
  #typeSort = TypeSort.DAY;
  #typeFilter = TypeFilter.EVERYTHING;

  constructor(minePresenter, sortingContainer, buttonNewEventContainer) {
    this.#minePresenter = minePresenter;
    this.#sortingContainer = sortingContainer;
    this.#buttonNewEventContainer = buttonNewEventContainer;

    store.subscribe(this.#redrawing);
  }


  init() {
    this.#renderPage();
  }


  #sortWaypoints = () => {
    switch (this.#typeSort) {
      case TypeSort.DAY:
        return [...getWaypointsList()].sort((waypointA, waypointB) => sortWaypointsDown(waypointA.dateFrom, waypointB.dateFrom)).reverse();
      case TypeSort.PRICE:
        return [...getWaypointsList()].sort((waypointA, waypointB) => sortWaypointsDown(waypointA.basePrice, waypointB.basePrice));
    }
  };


  #filterWaypoints = () => {
    switch (this.#typeFilter) {
      case TypeFilter.EVERYTHING:
        this.#action({
          nameAction: TypeAction.EVERYTHING,
          nameRedraw: TypeRedraw.MINOR,
          data: null
        });
        break;
      case TypeFilter.FUTURE:
        this.#action({
          nameAction: TypeAction.FILTER_FUTURE,
          nameRedraw: TypeRedraw.MINOR,
          data: null
        });
        break;
    }
  };


  #action = ({nameAction, nameRedraw, data}) => {
    switch (nameAction) {
      case TypeAction.PUT:
        store.dispatch(upgradeWaypoint({nameRedraw, data}));
        break;
      case TypeAction.POST:
        store.dispatch(addWaypoint({nameRedraw, data}));
        break;
      case TypeAction.DELETE:
        store.dispatch(deleteWaypoint({nameRedraw, data}));
        break;
      case TypeAction.FILTER_FUTURE:
        store.dispatch(filterWaypointsFuture({nameRedraw}));
        break;
      case TypeAction.EVERYTHING:
        store.dispatch(filterWaypointsEverything({nameRedraw}));
        break;
    }
  };


  #redrawing = () => {
    const {waypoint, valueRedraw} = getDataWaypoints();

    switch (valueRedraw) {
      case TypeRedraw.PATCH_UPDATE:
        this.#waypointsPresenterList.get(waypoint.uniqueValue).init(waypoint);
        break;
      case TypeRedraw.PATCH_DELET:
        this.#waypointsPresenterList.get(waypoint.uniqueValue).destroy();
        this.#waypointsPresenterList.delete(waypoint.uniqueValue);
        break;
      case TypeRedraw.MINOR:
        this.#clearWaypointList();
        this.#creatWaypointsList();
        break;
    }
  };


  #redootPage = () => {
    this.#closeFormEditAndAddPoint();
    if(this.#elementSort.nameSort !== TypeSort.DAY || this.#filter.nameFilter !== TypeFilter.EVERYTHING) {
      this.#checkRedrawFilter();
      this.#checkRedrawSort();
      this.#filterWaypoints();
    }
    this.#checkRedrawFilter();
    this.#checkRedrawSort();
  };


  #checkRedrawSort = () => {
    if(this.#elementSort.nameSort === TypeSort.PRICE) {
      this.#typeSort = TypeSort.DAY;
      this.#elementSort.destroy(this.#elementSort);
      this.#renderElementSort();
    }
  };


  #checkRedrawFilter = () => {
    if(this.#filter.nameFilter === TypeFilter.FUTURE) {
      this.#typeFilter = TypeFilter.EVERYTHING;
      this.#filter.destroy(this.#filter);
      this.#renderElementFilter();
    }
  };


  #filterTypeChange = (typeFilter) => {
    this.#typeFilter = typeFilter;
    this.#typeSort = TypeSort.DAY;
    this.#filterWaypoints();
    this.#checkRedrawSort();
  };


  #sortTypeChange = (typeSort) => {
    this.#typeSort = typeSort;
    this.#clearWaypointList();
    this.#creatWaypointsList();
  };


  #closeFormEditAndAddPoint = () => {
    this.#waypointsPresenterList.forEach((waypointPresenter) => waypointPresenter.closeOpenFormEditPoint());
    this.#creatNewEventPresenter.closeOpenFormAddNewPoint();
  };


  #clearWaypointList = () => {
    this.#waypointsPresenterList.forEach((waypoint) => waypoint.destroy());
    this.#waypointsPresenterList.clear();
  };


  #creatWaypointsList = () => {
    this.#sortWaypoints().map((route) => this.#renderWaypointsList(route));
  };


  #renderWaypointsList = (route) => {
    const waypointPresenter = new WaypointPresenter(
      this.#containerForContent,
      this.#closeFormEditAndAddPoint,
      this.#action
    );
    waypointPresenter.init(route);
    this.#waypointsPresenterList.set(route.uniqueValue, waypointPresenter);
  };


  #renderCreatNewEventPresenter = () => {
    this.#creatNewEventPresenter = new CreatNewEventPresenter(
      this.#buttonNewEventContainer,
      this.#containerForContent,
      this.#redootPage,
      this.#action,
    );
    this.#creatNewEventPresenter.init();
  };


  #renderElementFilter = () => {
    this.#filter = new FilterView(
      this.#filterTypeChange
    );

    render(this.#filter, this.#minePresenter);
  };


  #renderElementSort = () => {
    this.#elementSort = new SortingView(
      this.#sortTypeChange
    );

    render(this.#elementSort, this.#sortingContainer, RenderPosition.AFTERBEGIN);
  };


  #renderPage = () => {
    this.#renderElementFilter();
    this.#renderCreatNewEventPresenter();
    render(this.#containerForContent, this.#sortingContainer);
    this.#renderElementSort();

    this.#creatWaypointsList();
  };
}
