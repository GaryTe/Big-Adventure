import FilterView from '../view/filter-view';
import SortingView from '../view/sorting-view';
import ContainerForContentView from '../view/container-for-content-view';
import WaypointPresenter from './waypoint-presenter';
import CreatNewEventPresenter from './creat-new-event-presenter';
import ScreenError from '../view/screen-error/screen-error';
import {
  render,
  RenderPosition,
} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {
  TypeSort,
  TypeFilter,
  TypeAction,
  TypeRedraw,
  TimeLimit
} from '../const';
import {
  sortWaypointsDown,
} from '../utils/utils';
import {
  setDestinationsList,
  setOffers
} from '../utils/utils-for-forms';
import { getWaypointsList } from '../redux/selectors/data-waypoints/selectors';
import { getDataWaypoints } from '../redux/selectors/data-for-redrawing/selectors';
import { getDataDestinations } from '../redux/selectors/data-destinations/selectors';
import { getDataOffers } from '../redux/selectors/data-offers/selectors';
import {
  filterWaypointsFuture,
  filterWaypointsEverything
} from '../redux/reducer/get-weypoints/get-weypoints';
import { store } from '../redux/store/store';
import {
  getPoints,
  getDestinations,
  getOffers,
  changesWaypoint,
  addNewWaypoint,
  deletePoint
} from '../request-server/request-server.js';


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
  #unsubscribe = {};
  #points = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #screenError = new ScreenError();

  constructor(minePresenter, sortingContainer, buttonNewEventContainer) {
    this.#minePresenter = minePresenter;
    this.#sortingContainer = sortingContainer;
    this.#buttonNewEventContainer = buttonNewEventContainer;

  }


  init() {
    this.#action({nameAction: TypeAction.PENDING});
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
      case TypeAction.PENDING:
        this.#unsubscribe.redrawing = store.subscribe(
          () => {
            if(getDataWaypoints().nameRadraw === TypeAction.PENDING) {
              this.#redrawing({waypoint: null, valueRedraw: TypeAction.PENDING});
            }
          }
        );
        this.#unsubscribe.destinations = store.subscribe(
          () => {
            if(getDataDestinations().valueRedraw === TypeAction.FULFILLED) {
              setDestinationsList(getDataDestinations().destinationsList);
            }
          }
        );
        this.#unsubscribe.offers = store.subscribe(
          () => {
            if(getDataOffers().valueRedraw === TypeAction.FULFILLED) {
              setOffers(getDataOffers().offersList);
            }
          }
        );
        store.dispatch(getOffers);
        store.dispatch(getDestinations);
        store.dispatch(getPoints);
        break;
      case TypeAction.PUT:
        store.dispatch(() => changesWaypoint(nameRedraw, data, this.#waypointsPresenterList));
        break;
      case TypeAction.POST:
        store.dispatch(() => addNewWaypoint(nameRedraw, data, this.#creatNewEventPresenter));
        break;
      case TypeAction.DELETE:
        store.dispatch(() => deletePoint(nameRedraw, data, this.#waypointsPresenterList));
        break;
      case TypeAction.FILTER_FUTURE:
        store.dispatch(filterWaypointsFuture({nameRedraw}));
        break;
      case TypeAction.EVERYTHING:
        store.dispatch(filterWaypointsEverything({nameRedraw}));
        break;
    }
  };


  #redrawing = ({waypoint, valueRedraw}) => {

    switch (valueRedraw) {
      case TypeRedraw.MINOR_PENDING:
        this.#uiBlocker.block();
        this.#unsubscribe.redrawing();
        this.#renderElementFilter();
        render(this.#containerForContent, this.#sortingContainer);
        this.#renderElementSort();
        this.#unsubscribe.redrawing = store.subscribe(
          () => {
            if(getDataWaypoints().nameRadraw === TypeRedraw.MINOR_FULFILLED
            &&
            getDataDestinations().valueRedraw === TypeRedraw.MINOR_FULFILLED
            &&
            getDataOffers().valueRedraw === TypeRedraw.MINOR_FULFILLED
            ) {
              this.#redrawing({waypoint: null, valueRedraw: TypeRedraw.MINOR_FULFILLED});
            }

            if(getDataWaypoints().nameRadraw === TypeRedraw.MINOR_REJECTED
            ||
            getDataDestinations().valueRedraw === TypeRedraw.MINOR_REJECTED
            ||
            getDataOffers().valueRedraw === TypeRedraw.MINOR_REJECTED
            ) {
              this.#redrawing({waypoint: null, valueRedraw: TypeRedraw.MINOR_REJECTED});
            }
          }
        );
        break;
      case TypeRedraw.MINOR_FULFILLED:
        this.#points = getWaypointsList();
        this.#unsubscribe.redrawing();
        this.#unsubscribe.destinations();
        this.#unsubscribe.offers();
        this.#creatWaypointsList();
        this.#renderCreatNewEventPresenter();
        this.#uiBlocker.unblock();
        this.#unsubscribe.redrawing = store.subscribe(
          () => {
            const {dataWaypoint, nameRadraw} = getDataWaypoints();
            this.#redrawing({waypoint: dataWaypoint, valueRedraw: nameRadraw});}
        );
        break;
      case TypeRedraw.MINOR_REJECTED:
        this.#unsubscribe.redrawing();
        this.#uiBlocker.unblock();
        this.#screenError.addScreenError();
        break;
      case TypeRedraw.PATCH_UPDATE:
        this.#waypointsPresenterList.get(waypoint.id).init(waypoint);
        break;
      case TypeRedraw.PATCH_DELET:
        this.#waypointsPresenterList.get(waypoint.id).destroy();
        this.#waypointsPresenterList.delete(waypoint.id);
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
    this.#waypointsPresenterList.set(route.id, waypointPresenter);
  };


  #renderCreatNewEventPresenter = () => {
    this.#creatNewEventPresenter = new CreatNewEventPresenter(
      this.#buttonNewEventContainer,
      this.#containerForContent,
      this.#redootPage,
      this.#action,
      this.#points
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

}
