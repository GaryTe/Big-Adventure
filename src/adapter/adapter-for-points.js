export const adaptToClient = (points) => {
  const dataPoints = [];

  points.forEach((point) => {
    const dataPoint = {
      ...point,
      dateFrom: point.date_from,
      dateTo: point.date_to,
      basePrice: point.base_price,
      isFavorite: point.is_favorite,
    };

    delete dataPoint.date_from;
    delete dataPoint.date_to;
    delete dataPoint.base_price;
    delete dataPoint.is_favorite;

    dataPoints.push(dataPoint);
  });

  return dataPoints;
};


export const adaptToClientWaypoint = (point) => {
  const dataPoint = {
    ...point,
    dateFrom: point.date_from,
    dateTo: point.date_to,
    basePrice: point.base_price,
    isFavorite: point.is_favorite,
  };

  delete dataPoint.date_from;
  delete dataPoint.date_to;
  delete dataPoint.base_price;
  delete dataPoint.is_favorite;

  return dataPoint;
};


export const adaptToServer = (point) => {
  const dataPoint = {
    ...point,
    'date_from': point.dateFrom,
    'date_to': point.dateTo,
    'base_price': point.basePrice,
  };

  delete dataPoint.dateFrom;
  delete dataPoint.dateTo;
  delete dataPoint.basePrice;

  return dataPoint;
};
