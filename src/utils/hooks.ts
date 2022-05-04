import React from 'react'

type IUseAsyncState<T> = {
    data: T | null
    status: 'idle' | 'pending' | 'resolved' | 'rejected'
    error: unknown | null
}

type IUseAsyncAction<T> =
    | {
        status: 'pending'
    }
    | {
        status: 'resolved'
        data: T
    }
    | {
        status: 'rejected'
        error: unknown | null
    }
    | {
        data: T
    }
    | {
        error: unknown | null
    }

type IUseAsyncParams<T> = Pick<IUseAsyncState<T>, 'data' | 'status'>

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
        args => {
            if (!mounted.current) {
                return
            }

            dispatch(args)
        },
        [dispatch],
    )
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = { status: 'idle', data: null, error: null }

function useAsync<T>(initialState?: IUseAsyncParams<T>) {
    const initialStateRef = React.useRef({
        ...(defaultInitialState as IUseAsyncState<T>),
        ...initialState,
    })
    const [{ status, data, error }, setState] = React.useReducer<
        React.Reducer<IUseAsyncState<T>, IUseAsyncAction<T>>
    >((s, a) => ({ ...s, ...a }), initialStateRef.current)

    const safeSetState = useSafeDispatch(setState)

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
                    safeSetState({ data, status: 'resolved' })
                    return data
                },
                error => {
                    safeSetState({ status: 'rejected', error })
                    return error
                },
            )
        },
        [safeSetState],
    )

    const setData = React.useCallback<(data: T) => void>(
        data => safeSetState({ data }),
        [safeSetState],
    )
    const setError = React.useCallback<(error: T | null) => void>(
        error => safeSetState({ error }),
        [safeSetState],
    )
    const reset = React.useCallback(
        () => safeSetState(initialStateRef.current),
        [safeSetState],
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

export {
    useAsync
}