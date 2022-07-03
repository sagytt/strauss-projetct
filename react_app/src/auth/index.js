import {API} from "../config";

export const signup = (user) => {
    return fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error)
        })
};

export const signin = user => {
    return fetch(`${API}/api/auth/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error)
        })
};

//Method to save user signin jwt token in local storage
export const authenticate = (data, next) => {
    //If we have a windows object
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/api/auth/signout`, {
            method: "GET",
        }).then(response => {
            console.log('signout', response)
        }).catch(error => console.log(error));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else {
        return false;
    }
};