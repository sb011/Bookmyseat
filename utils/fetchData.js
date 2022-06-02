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
