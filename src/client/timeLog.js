const apiHost = process.env.REACT_APP_API_HOST;

export const getTimeLogs = () => fetch(apiHost + "/timeLogs/")
export const getUnfinishedTimeLog = () => fetch(apiHost + "/timeLog/unfinished")

export const getTimeLog = (timeLogId) => fetch(apiHost + "/timeLogs/" + timeLogId)
export const saveTimeLog = (timeLogId, timeLog) => {
    if (timeLogId) {
        return fetch(apiHost + "/timeLogs/" + timeLogId, {
            method: "PUT",
            body: JSON.stringify(timeLog),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    } else {
        return fetch(apiHost + "/users/", {
            method: "POST",
            body: JSON.stringify(timeLog),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }
}

export const checkinUser = (userName, season = null) => { return fetch(apiHost + "/timeLog/checkin?user=" + userName + (season ? "&season=" + season : "")) }
export const checkoutUser = (userName) => { return fetch(apiHost + "/timeLog/checkout?user=" + userName) }