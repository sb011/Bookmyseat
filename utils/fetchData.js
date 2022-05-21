const BASE_URL = process.env.BASE_URL

export const getData = async (url) => {
    const res = await fetch(`http://localhost:3000/api/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()
    return data
}

export const postData = async (url, post) => {
    const res = await fetch(`http://localhost:3000/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const putData = async (url, post, token) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url, post, token) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const deleteData = async (url, token) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}