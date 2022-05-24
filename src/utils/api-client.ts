import * as auth from 'auth-provider'
import { ClientConfigs } from '../types'

const apiURL = process.env.REACT_APP_API_URL

export async function client(
    endpoint: string,
    { data, token, headers: customHeaders, ...customConfigs }: {
        data?: unknown;
        token?: string;
        headers?: Record<string, string>,
    } & Partial<ClientConfigs> = {},
) {
    const config: ClientConfigs = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfigs,
    }
    //@ts-expect-error
    const response = await window.fetch(`${apiURL}/${endpoint}`, config)
    if (response.status === 401) {
        await auth.logout()
        // refresh the page for them
        //@ts-expect-error
        window.location.assign(window.location)
        return Promise.reject({ message: 'Please re-authenticate.' })
    }
    const res = await response.json()
    if (response.ok) {
        return res
    } else {
        return Promise.reject(res)
    }
}


