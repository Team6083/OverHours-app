const apiHost = process.env.REACT_APP_API_HOST;

export const getStatUsers = (seasonId) => fetch(apiHost + `/stat/users${seasonId ? `?seasonId=${seasonId}` : ""}`).then((r) => r.json());
