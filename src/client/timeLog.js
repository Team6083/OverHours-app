const apiHost = process.env.REACT_APP_API_HOST;

export const getUnfinishedTimeLog = () => fetch(apiHost + "/timeLog/unfinished")
export const checkinUser = (userName, season = null) => { return fetch(apiHost + "/timeLog/checkin?user=" + userName + (season ? "&season=" + season : "")) }
export const checkoutUser = (userName) => { return fetch(apiHost + "/timeLog/checkout?user=" + userName) }