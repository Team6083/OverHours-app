const apiHost = process.env.REACT_APP_API_HOST;

export const getTimeLogs = () => fetch(apiHost + "/timeLogs/")
export const getUnfinishedTimeLog = () => fetch(apiHost + "/timeLog/unfinished").then((r) => r.json());

export const getTimeLog = ({ timeLogId }) => fetch(apiHost + "/timeLogs/" + timeLogId)
export const saveTimeLog = ({ timeLogId, timeLog }) => {
    if (timeLogId) {
        return fetch(apiHost + "/timeLogs/" + timeLogId, {
            method: "PUT",
            body: JSON.stringify(timeLog),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    } else {
        return fetch(apiHost + "/timeLogs/", {
            method: "POST",
            body: JSON.stringify(timeLog),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }
}

export const deleteTimeLog = ({ timeLogId }) => {
    return fetch(apiHost + "/timeLogs/" + timeLogId, {
        method: "DELETE"
    })
}

export const checkinUser = ({ userName, season = null }) => fetch(apiHost + `/timeLog/checkin?user=${userName}` + (season ? `&season=${season}` : ""))
    .then((r) => {
        if (r.status === 422) {
            return r.json().then((error) => Promise.reject(error));
        }
        return Promise.resolve();
    })

export const checkoutUser = ({ userName }) => fetch(apiHost + `/timeLog/checkout?user=${userName}`)
    .then((r) => {
        if (r.status === 422) {
            return r.json().then((error) => Promise.reject(error));
        }
        return Promise.resolve();
    })

export const getSeasonIds = () => fetch(apiHost + "/timeLog/seasonIds").then((r) => r.json());