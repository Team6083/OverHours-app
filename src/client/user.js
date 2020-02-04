const apiHost = process.env.REACT_APP_API_HOST;

export const getUsers = () => fetch(apiHost + "/users/");

export const getUser = (userId) => fetch(apiHost + "/users/" + userId);

export const saveUser = (userId, user) => {
    if (userId) {
        return fetch(apiHost + "/users/" + userId, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    } else {
        return fetch(apiHost + "/users/", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }
}