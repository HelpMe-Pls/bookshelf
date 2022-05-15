import { useQuery, useMutation, useQueryClient } from 'react-query'
import { setQueryDataForBook } from './books'
import { client } from './api-client'
import { CommonBook, BookProps, User } from 'types'

export function useListItems(user: User) {
    const queryClient = useQueryClient()
    const { data: listItems } = useQuery<CommonBook[]>({
        queryKey: 'list-items',
        queryFn: () =>
            client(`list-items`, { token: user.token }).then(data => data.listItems),
        onSuccess(items) {
            for (const listItem of items) {
                setQueryDataForBook(queryClient, listItem.book!)
            }
        },

    })
    return listItems ?? []
}


export function useListItem(user: User, bookId: string) {
    const listItems = useListItems(user)
    return listItems.find((li: CommonBook) => li.bookId === bookId) ?? null
}


export function useUpdateListItem(user: User, ...options: any) {
    const queryClient = useQueryClient()
    return useMutation(
        (updates: Pick<CommonBook, "bookId" | "id" | "finishDate" | "rating" | "notes">) =>
            client(`list-items/${updates.id}`, {
                method: 'PUT',
                data: updates,
                token: user.token,
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

export function useRemoveListItem(user: User, ...options: any) {
    const queryClient = useQueryClient()
    return useMutation(
        ({ id }: Pick<CommonBook, "id">) => client(`list-items/${id}`,
            { method: 'DELETE', token: user.token }),
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

export function useCreateListItem(user: User, ...options: any) {
    const queryClient = useQueryClient()
    return useMutation(
        ({ bookId }: Pick<BookProps, "bookId">) => client(`list-items`, { data: { bookId }, token: user.token }),
        {
            onSettled: () => queryClient.invalidateQueries('list-items'),
            ...options,
        }
    )
}
