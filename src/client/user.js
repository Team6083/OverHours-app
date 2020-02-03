const apiHost = process.env.REACT_APP_API_HOST;

export const getUsers = () => fetch(apiHost + "/users/");
