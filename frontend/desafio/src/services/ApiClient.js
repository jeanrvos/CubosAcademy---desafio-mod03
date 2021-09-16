const BASE_URL = "https://desafio-m03.herokuapp.com/";

async function post(resource, data) {
    const resposta = await fetch(BASE_URL+resource, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
    });

    return resposta.json();
}

async function get(resource, token) {
    const resposta = await fetch(BASE_URL+resource, {
        headers: {
          authorization: `Bearer ${token}`
        }
    });

    return resposta.json();
}

async function put(resource, data) {
    const resposta = await fetch(BASE_URL+resource, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
    });

    return resposta.json();
}

async function del(resource, token) {
    const resposta = await fetch(BASE_URL+resource, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return resposta.json();
}

export { post, get, put, del };