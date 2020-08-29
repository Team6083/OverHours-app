const apiHost = process.env.REACT_APP_API_HOST;

export const login = (username, password) => {
    return fetch(apiHost + "/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
}