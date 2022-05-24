import { useQuery, useMutation, useQueryClient } from 'react-query'
import { setQueryDataForBook } from './books'
import { useClient } from 'context/auth-context'
import { CommonBook, BookProps } from 'types'

export function useListItems(options: any = {}) {
    const client = useClient()
    const queryClient = useQueryClient()
    const { data: listItems } = useQuery<CommonBook[]>({
        queryKey: 'list-items',
        queryFn: () => client('list-items').then(data => data.listItems),
        ...options,
        onSuccess: async items => {
            await options.onSuccess?.(items)
            for (const listItem of items) {
                setQueryDataForBook(queryClient, listItem.book!)
            }
        },

    })
    return listItems ?? []
}


export function useListItem(bookId: string, options?: unknown) {
    const listItems = useListItems(options)
    return listItems.find((li: CommonBook) => li.bookId === bookId) ?? null
}


export function useUpdateListItem(options?: any) {
    const client = useClient()
    const queryClient = useQueryClient()
    return useMutation(
        (updates: Pick<CommonBook, "bookId" | "id" | "finishDate" | "rating" | "notes">) =>
            client(`list-items/${updates.id}`, {
                method: 'PUT',
                data: updates,
            }),
        {
            onMutate(newItem) {
                const previousItems = queryClient.getQueryData('list-items')

                queryClient.setQueryData('list-items', (old: CommonBook[] | undefined) => {
                    return old!.map((item: CommonBook) => {
                        return item.id === newItem.id ? { ...item, ...newItem } : item
                    })
                })

                return () => queryClient.setQueryData('list-items', previousItems)
            },
            onSettled: () => queryClient.invalidateQueries('list-items'),
            ...options,
        },
    )
}

export function useRemoveListItem(options?: any) {
    const client = useClient()
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: Pick<CommonBook, "id">) => client(`list-items/${id}`,
            { method: 'DELETE' }),
        {
            onMutate(removedItem: CommonBook) {
                const previousItems: CommonBook[] | undefined = queryClient.getQueryData('list-items')

                queryClient.setQueryData('list-items', (old: CommonBook[] | undefined) => {
                    return old!.filter((item: CommonBook) => item.id !== removedItem.id)
                })

                return () => queryClient.setQueryData('list-items', previousItems)
            },
            onSettled: () => queryClient.invalidateQueries('list-items'),
            ...options,
        },
    )
}

export function useCreateListItem(options?: any) {
    const client = useClient()
    const queryClient = useQueryClient()

    return useMutation(
        ({ bookId }: Pick<BookProps, "bookId">) => client(`list-items`, {
            data: { bookId }
        }),
        {
            onSettled: () => queryClient.invalidateQueries('list-items'),
            ...options,
        }
    )
}
