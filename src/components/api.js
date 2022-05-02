const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
    headers: {
        authorization: "49010d44-315f-475d-8895-b34a2d4f4848",
        "Content-Type": "application/json",
    },
};

function responseCheck(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const getUserInformation = res => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(responseCheck);
}

export const getCards = res => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(responseCheck);
    console.log(res);
}
/*
export const getCards = res => {
     fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    });
    return responseCheck(res); 
};

export const addCard = () => {};
export const deleteCard = () => {};*/