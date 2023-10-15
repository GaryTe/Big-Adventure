import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';


dayjs.extend(toObject);
dayjs.extend(isSameOrBefore);


const humanizData = (value) => dayjs(value).format('DD MMM');
const humanizTame = (value) => dayjs(value).format('HH:mm');
const getDate = (value) => {
  const date = dayjs(value).toObject();
  const time = `${date.years}-${date.months}-${date.date}`;
  return time;
};


const getDataTime = (value) => {
  const date = dayjs(value).toObject();
  const dateTime = `${date.years}-${date.months}-${date.date}T${date.hours}:${date.minutes}`;
  return dateTime;
};


const updateDataWaypoint = (routesList, updateWaypoint) => {
  const updateData = routesList.map((dataRoute) => dataRoute.id === updateWaypoint.id ? updateWaypoint : dataRoute);
  return updateData;
};


const updateDataWaypointList = (routesList, updateWaypoint) => {
  const updateData = routesList.filter((dataRoute) => dataRoute.id !== updateWaypoint.id);
  return updateData;
};


function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}


function sortWaypointsDown(waypointA, waypointB) {
  const weight = getWeightForNullDate(waypointA, waypointB);

  return weight ?? dayjs(waypointB).diff(dayjs(waypointA));
}


const filterWaypoints = (waypoints) => {
  const sortWaypoints = [];
  waypoints.forEach((waypoint) => {
    if(
      dayjs().isSameOrBefore(waypoint.dateFrom, 'D')
      ||
      dayjs().isBefore(waypoint.dateTo, 'D')
    ) {
      sortWaypoints.push(waypoint);
    }
  });

  return sortWaypoints;
};


export {
  humanizData,
  humanizTame,
  getDate,
  getDataTime,
  sortWaypointsDown,
  filterWaypoints,
  updateDataWaypoint,
  updateDataWaypointList
};
