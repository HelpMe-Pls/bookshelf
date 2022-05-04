async function client(endpoint: string, customConfig = {}) {
    const config = {
        method: 'GET',
        ...customConfig,
    }

    const response = await window
        .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        return Promise.reject(data)
    }
}

export { client }
