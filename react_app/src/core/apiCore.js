import { API } from "../config";


export const getCandidates = () => {
    return fetch(`${API}/api/candidates`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCandidate = candidate => {
    return fetch(`${API}/api/candidate/${candidate}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

