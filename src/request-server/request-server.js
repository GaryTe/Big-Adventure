import {
  ADDRESS_SERVER,
  Path,
  VALUE_AUTHORIZATION
} from '../const';
import {
  setWaypoints,
  upgradeWaypoint,
  addWaypoint,
  deleteWaypoint
} from '../redux/reducer/get-weypoints/get-weypoints';
import { setDestinations } from '../redux/reducer/get-destinations/get-destinations';
import { setOffers } from '../redux/reducer/get-offers/get-offers';
import {
  adaptToClient,
  adaptToClientWaypoint,
  adaptToServer
} from '../adapter/adapter-for-points';
import { store } from '../redux/store/store';
import { TypeAction, textRespons } from '../const';


export const getPoints = async () => {
  let respons = null;
  store.dispatch(setWaypoints({dataPoints: null, valuePromise: TypeAction.PENDING}));

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.POINTS}`, {
      headers: {
        Authorization: VALUE_AUTHORIZATION
      }
    });
    if(respons.ok !== true){
      store.dispatch(setWaypoints({respons: textRespons, valuePromise: TypeAction.REJECTED}));
      return;
    }
  }catch(error) {
    store.dispatch(setWaypoints({respons: textRespons, valuePromise: TypeAction.REJECTED}));
    return;
  }
  const points = await respons.json();
  const dataPoints = adaptToClient(points);

  store.dispatch(setWaypoints({dataPoints, valuePromise: TypeAction.FULFILLED}));
};


export const getDestinations = async () => {
  let respons = null;
  store.dispatch(setDestinations({dataDestinations: null, valuePromise: TypeAction.PENDING}));

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.DESTINATIONS}`, {
      headers: {
        Authorization: VALUE_AUTHORIZATION
      }
    });
    if(respons.ok !== true){
      store.dispatch(setDestinations({respons: textRespons, valuePromise: TypeAction.REJECTED}));
      return;
    }
  }catch(error){
    store.dispatch(setDestinations({respons: textRespons, valuePromise: TypeAction.REJECTED}));
    return;
  }

  const destinations = await respons.json();
  const dataDestinations = destinations;

  store.dispatch(setDestinations({dataDestinations, valuePromise: TypeAction.FULFILLED}));
};


export const getOffers = async () => {
  let respons = null;
  store.dispatch(setOffers({dataOffers: null, valuePromise: TypeAction.PENDING}));

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.OFFERS}`, {
      headers: {
        Authorization: VALUE_AUTHORIZATION
      }
    });
    if(respons.ok !== true){
      store.dispatch(setOffers({respons: textRespons, valuePromise: TypeAction.REJECTED}));
      return;
    }
  }catch(error){
    store.dispatch(setOffers({respons: textRespons, valuePromise: TypeAction.REJECTED}));
    return;
  }

  const offers = await respons.json();
  const dataOffers = offers;

  store.dispatch(setOffers({dataOffers, valuePromise: TypeAction.FULFILLED}));
};


export const changesWaypoint = async (nameRedraw, dataWaypoint, waypointsPresenterList) => {
  let respons = null;
  const data = adaptToServer(dataWaypoint);
  const index = Number(dataWaypoint.id);
  waypointsPresenterList.get(dataWaypoint.id).setSaving();

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.POINTS}/${index}`,
      {
        method: 'PUT',
        headers: {
          Authorization: VALUE_AUTHORIZATION
        },
        body: JSON.stringify(data)
      });
    if(respons.ok !== true) {
      waypointsPresenterList.get(dataWaypoint.id).setAborting();
      throw new Error('Can\'t update waypoint');
    }
  }catch(error){
    waypointsPresenterList.get(dataWaypoint.id).setAborting();
    throw new Error('Can\'t update waypoint');
  }

  const point = await respons.json();
  const dataPoint = adaptToClientWaypoint(point);

  store.dispatch(upgradeWaypoint({nameRedraw, data: dataPoint}));
  waypointsPresenterList.replaceFormEditPointToWaypoint();
};


export const addNewWaypoint = async (nameRedraw, dataWaypoint, creatNewEventPresenter) => {

  let respons = null;
  const data = adaptToServer(dataWaypoint);

  creatNewEventPresenter.setSaving();

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.POINTS}`,
      {
        method: 'POST',
        headers: {
          Authorization: VALUE_AUTHORIZATION
        },
        body: JSON.stringify(data)
      });
    if(respons.ok !== true) {
      creatNewEventPresenter.setAborting();
      throw new Error('Can\'t add waypoint');
    }
  }catch(error){
    creatNewEventPresenter.setAborting();
    throw new Error('Can\'t add waypoint');
  }

  const point = await respons.json();
  const dataPoint = adaptToClientWaypoint(point);

  store.dispatch(addWaypoint({nameRedraw, data: dataPoint}));
  creatNewEventPresenter.closeOpenFormAddNewPoint();

  //creatNewEventPresenter.setSaving();
  //store.dispatch(addWaypoint({nameRedraw, data: dataWaypoint}));
  //creatNewEventPresenter.closeOpenFormAddNewPoint();
};


export const deletePoint = async (nameRedraw, dataWaypoint, waypointsPresenterList) => {

  let respons = null;
  const index = Number(dataWaypoint.id);

  waypointsPresenterList.get(dataWaypoint.id).setDeleting();

  try{
    respons = await fetch(`${ADDRESS_SERVER}${Path.POINTS}/${index}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: VALUE_AUTHORIZATION
        }
      });
    if(respons.ok !== true) {
      waypointsPresenterList.get(dataWaypoint.id).setAborting();
      throw new Error('Can\'t delete waypoint');
    }
  }catch(error){
    waypointsPresenterList.get(dataWaypoint.id).setAborting();
    throw new Error('Can\'t delete waypoint');
  }

  store.dispatch(deleteWaypoint({nameRedraw, data: dataWaypoint}));

  //waypointsPresenterList.get(dataWaypoint.id).setDeleting();
  //store.dispatch(deleteWaypoint({nameRedraw, data: dataWaypoint}));
};
