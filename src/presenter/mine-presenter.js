import PointModel from '../model/point-model';
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
  TypeFilter
} from '../const';
import {
  sortWaypointsDown,
  filterWaypoints,
  updateDataWaypoint,
  updateDataWaypointList
} from '../utils/utils';

export default class MinePresenter {
  #pointModel = new PointModel();
  #minePresenter = null;
  #sortingContainer = null;
  #buttonNewEventContainer = null;
  #creatNewEventPresenter = null;
  #filter = null;
  #elementSort = null;
  #containerForContent = new ContainerForContentView();
  #waypointsPresenterList = new Map();

  #routesList = this.#pointModel.routesList;
  #originalRoutesList = this.#pointModel.routesList;

  constructor(minePresenter, sortingContainer, buttonNewEventContainer) {
    this.#minePresenter = minePresenter;
    this.#sortingContainer = sortingContainer;
    this.#buttonNewEventContainer = buttonNewEventContainer;
  }


  init() {
    this.#renderPage();
  }

  #recordNewWaypoint = (newWaypoint) => {
    this.#routesList.push(newWaypoint);
    this.#originalRoutesList = this.#routesList;
    this.#sortWaypointsBeforeFirstRender(this.#routesList);
    this.#clearWaypointList();
    this.#creatWaypointsList(this.#routesList);
  };

  #changeWaypoint = (updateWaypoint) => {
    const updateWaypointsList = updateDataWaypoint(this.#routesList, updateWaypoint);
    this.#originalRoutesList = updateWaypointsList;
    this.#routesList = this.#originalRoutesList;
    this.#waypointsPresenterList.get(updateWaypoint.uniqueValue).init(updateWaypoint);
  };

  #deletWaypoint = (updateWaypoint) => {
    const updateWaypointsList = updateDataWaypointList(this.#routesList, updateWaypoint);
    this.#originalRoutesList = updateWaypointsList;
    this.#routesList = this.#originalRoutesList;
    this.#waypointsPresenterList.get(updateWaypoint.uniqueValue).destroy();
    this.#waypointsPresenterList.delete(updateWaypoint.uniqueValue);
  };


  #checkRedrawSort = () => {
    if(this.#elementSort.nameSort === TypeSort.PRICE) {
      this.#elementSort.destroy(this.#elementSort);
      this.#renderElementSort();
    }
  };

  #checkRedrawFilter = () => {
    if(this.#filter.nameFilter === TypeFilter.FUTURE) {
      this.#filter.destroy(this.#filter);
      this.#renderElementFilter();
    }
  };

  #redootPage = () => {
    this.#closeFormEditAndAddPoint();
    this.#checkRedrawFilter();
    this.#checkRedrawSort();
    this.#clearWaypointList();
    this.#routesList = this.#sortWaypointsBeforeFirstRender(this.#routesList);
    this.#creatWaypointsList(this.#routesList);
  };


  #filterWaypoints = (typeFilter) => {
    switch (typeFilter) {
      case TypeFilter.EVERYTHING:
        this.#routesList = this.#originalRoutesList;
        break;
      case TypeFilter.FUTURE:
        this.#routesList = filterWaypoints(this.#routesList);
        break;
    }
  };

  #filterTypeChange = (typeFilter) => {
    this.#filterWaypoints(typeFilter);
    this.#sortWaypoints(TypeSort.DAY);
    this.#clearWaypointList();
    this.#checkRedrawSort();
    this.#creatWaypointsList(this.#routesList);
  };


  #sortWaypoints = (typeSort) => {
    switch (typeSort) {
      case TypeSort.DAY:
        this.#routesList.sort((waypointA, waypointB) => sortWaypointsDown(waypointA.dateFrom, waypointB.dateFrom)).reverse();
        break;
      case TypeSort.PRICE:
        this.#routesList.sort((waypointA, waypointB) => sortWaypointsDown(waypointA.basePrice, waypointB.basePrice));
        break;
    }
  };

  #sortTypeChange = (typeSort) => {
    this.#sortWaypoints(typeSort);
    this.#clearWaypointList();
    this.#creatWaypointsList(this.#routesList);
  };


  #clearWaypointList = () => {
    this.#waypointsPresenterList.forEach((waypoint) => waypoint.destroy());
    this.#waypointsPresenterList.clear();
  };

  #closeFormEditAndAddPoint = () => {
    this.#waypointsPresenterList.forEach((waypointPresenter) => waypointPresenter.closeOpenFormEditPoint());
    this.#creatNewEventPresenter.closeOpenFormAddNewPoint();
  };

  #renderWaypointsList = (route) => {
    const waypointPresenter = new WaypointPresenter(
      this.#containerForContent,
      this.#closeFormEditAndAddPoint,
      this.#changeWaypoint,
      this.#deletWaypoint
    );
    waypointPresenter.init(route);
    this.#waypointsPresenterList.set(route.uniqueValue, waypointPresenter);
  };

  #creatWaypointsList = (routesList) => {
    routesList.map((route) => this.#renderWaypointsList(route));
  };


  #renderCreatNewEventPresenter = () => {
    this.#creatNewEventPresenter = new CreatNewEventPresenter(
      this.#buttonNewEventContainer,
      this.#containerForContent,
      this.#redootPage,
      this.#recordNewWaypoint,
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

  #sortWaypointsBeforeFirstRender = (routesList) => routesList.sort((waypointA, waypointB) => sortWaypointsDown(waypointA.dateFrom, waypointB.dateFrom)).reverse();

  #renderPage = () => {
    this.#renderElementFilter();
    this.#renderCreatNewEventPresenter();
    render(this.#containerForContent, this.#sortingContainer);
    this.#renderElementSort();

    this.#sortWaypointsBeforeFirstRender(this.#routesList);
    this.#creatWaypointsList(this.#routesList);
  };
}
