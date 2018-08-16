import queryString from "../libs/query-string";
import { LS_CURRENT_TIME, URL_MAX_TIME } from "./constants";

export const queryObject = () => {
  return queryString.parse(window.location.search);
};

export const setLocalStorageTime = time => {
  sessionStorage.setItem(LS_CURRENT_TIME, time);
};

export const getLocalStorageTime = () => {
  const time = sessionStorage.getItem(LS_CURRENT_TIME);
  return (time && +time) || 0;
};

export const currentPercentageTime = currTime => {
  const localStorageTime = getLocalStorageTime() || 0;
  const queryMaxTime = queryObject()[URL_MAX_TIME];
  const maxTime = (+queryMaxTime && +queryMaxTime * 60 * 1000) || 7 * 60 * 1000;
  let actualTime = 0;

  if (!isNaN(localStorageTime)) {
    actualTime = +localStorageTime;
  }

  if (!isNaN(currTime)) {
    actualTime = +currTime;
  }

  setLocalStorageTime(actualTime);

  return (Math.min(actualTime, maxTime) * 100) / maxTime;
};
