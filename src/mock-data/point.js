import { nanoid } from 'nanoid';

const points = [
  {
    uniqueValue: nanoid(),
    basePrice: 400,
    dateFrom: '2023-09-14T06:35:36.592Z',
    dateTo: '2023-09-01T09:55:49.576Z',
    destination: 14,
    id: '4',
    isFavorite: false,
    offers: [0, 1, 5],
    type: 'flight',
  },

  {
    uniqueValue: nanoid(),
    basePrice: 700,
    dateFrom: '2023-10-09T22:34:20.982Z',
    dateTo: '2023-10-11T03:56:10.033Z',
    destination: 1,
    id: '0',
    isFavorite: false,
    offers: [0, 1],
    type: 'restaurant'
  },
  {
    uniqueValue: nanoid(),
    basePrice: 600,
    dateFrom: '2023-08-12T03:56:10.033Z',
    dateTo: '2023-10-14T17:35:10.896Z',
    destination: 21,
    id: '1',
    isFavorite: true,
    offers: [0, 1, 3],
    type: 'flight'
  },
  {
    uniqueValue: nanoid(),
    basePrice: 1100,
    dateFrom: '2023-07-30T17:35:10.896Z',
    dateTo: '2023-08-03T09:38:15.010Z',
    destination: 14,
    id: '2',
    isFavorite: true,
    offers: [0, 1],
    type: 'restaurant',
  },
  {
    uniqueValue: nanoid(),
    basePrice: 1000,
    dateFrom: '2023-07-01T09:38:15.010Z',
    dateTo: '2023-07-04T06:35:36.592Z',
    destination: 18,
    id: '3',
    isFavorite: false,
    offers: [1, 2, 3, 4],
    type: 'check-in'
  }
];

export{points};
