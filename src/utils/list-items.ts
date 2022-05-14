import { useQuery, useMutation, useQueryClient } from 'react-query'
import { setQueryDataForBookInList } from './books'
import { client } from './api-client'
import { BookProps, BooksList, User } from 'types'

export function useListItems(user: User) {
    const queryClient = useQueryClient()
    const { data: listItems } = useQuery<BooksList>({
        queryKey: 'list-items',
        queryFn: () =>
            client(`list-items`, { token: user.token }).then(data => data.listItems),
        onSuccess(items) {
            for (const listItem of items!) {
                setQueryDataForBookInList(queryClient, listItem)
            }
        },

    })
    return listItems ?? []
}


export function useListItem(user: User, bookId: string) {
    const listItems = useListItems(user)
    return listItems.find((li: BookProps) => li.bookId === bookId) ?? null
}


export function useUpdateListItem(user: User, ...options: any) {
    const queryClient = useQueryClient()
    return useMutation(
        (updates: Pick<BookProps, "bookId" | "finishDate" | "rating" | "notes">) =>
            client(`list-items/${updates.bookId}`, {
                method: 'PUT',
                data: updates,
                token: user.token,
            }),
        {
            onMutate(newItem) {
                const previousItems = queryClient.getQueryData('list-items')

                queryClient.setQueryData('list-items', (old: BooksList) => {
                    return old!.map((item: BookProps) => {
                        return item.bookId === newItem.bookId ? { ...item, ...newItem } : item
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
        ({ bookId }: Pick<BookProps, "bookId">) => client(`list-items/${bookId}`, { method: 'DELETE', token: user.token }),
        {
            onMutate(removedItem: BookProps) {
                const previousItems = queryClient.getQueryData('list-items')

                queryClient.setQueryData('list-items', (old: BooksList) => {
                    return old!.filter((item: BookProps) => item.bookId !== removedItem.bookId)
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
