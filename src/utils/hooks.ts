import React from 'react'

type IUseAsyncState<T, E> = {
    data: T | null
    status: 'idle' | 'pending' | 'resolved' | 'rejected'
    error: E | null
}

type IUseAsyncAction<T, E> =
    | {
        status: 'pending'
    }
    | {
        status: 'resolved'
        data: T
    }
    | {
        status: 'rejected'
        error: E | null
    }
    | {
        data: T
    }
    | {
        error: E | null
    }

type IUseAsyncParams<T, E> = Pick<IUseAsyncState<T, E>, 'data' | 'status'>

type IUseAsyncRunFn<T> = (promise: Promise<T>) => Promise<T>



function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
    const mounted = React.useRef(false)
    React.useLayoutEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])
    return React.useCallback<(args: T) => void>(
        (...args) => (mounted.current ? dispatch(...args) : void 0),
        [dispatch],
    )
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = { status: 'idle', data: null, error: null }

export function useAsync<T, E>(initialState?: IUseAsyncParams<T, E>) {
    const initialStateRef = React.useRef({
        ...(defaultInitialState as IUseAsyncState<T, E>),
        ...initialState,
    })
    const [{ status, data, error }, setState] = React.useReducer<
        React.Reducer<IUseAsyncState<T, E>, IUseAsyncAction<T, E>>
    >((s, a) => ({ ...s, ...a }), initialStateRef.current)

    const safeSetState = useSafeDispatch(setState)

    const setData = React.useCallback<(data: T) => void>(
        data => safeSetState({ data, status: 'resolved' }),
        [safeSetState],
    )
    const setError = React.useCallback<(error: E | null) => void>(
        error => safeSetState({ error, status: 'rejected' }),
        [safeSetState],
    )
    const reset = React.useCallback(
        () => safeSetState(initialStateRef.current),
        [safeSetState],
    )
    const run = React.useCallback<IUseAsyncRunFn<T>>(
        promise => {
            if (!promise || !promise.then) {
                throw new Error(
                    `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
                )
            }
            safeSetState({ status: 'pending' })
            return promise.then(
                data => {
                    setData(data)
                    return data
                },
                error => {
                    setError(error)
                    return Promise.reject(error)
                },
            )
        },
        [safeSetState, setData, setError],
    )


    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}

