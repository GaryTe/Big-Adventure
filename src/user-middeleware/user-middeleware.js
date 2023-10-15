export const userMiddeleware = () => (next) => (action) => {
  if(typeof action === 'function') {
    return action();
  }

  return next(action);
};
