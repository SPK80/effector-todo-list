import {createDomain} from 'effector'

export type BaseItemType = {
    id: string
}

export type CollectionModelType<
    ItemDataType extends BaseItemType,
    ItemModelType extends BaseItemType,
> = ReturnType<typeof createCollectionModel<ItemDataType, ItemModelType>>

export type API<ItemType> = {
    getItems: (id: string) => Promise<{items: ItemType[]}>
    createItem: (id: string, title: string) => Promise<{item: ItemType}>
    deleteItem: (id: string, itemId: string) => Promise<{}>
}

export const createCollectionModel = <
    ItemDataType extends BaseItemType,
    ItemModelType extends BaseItemType,
>(
    id: string,
    api: API<ItemDataType>,
    createItemModel: (itemData: ItemDataType) => ItemModelType,
) => {
    const domain = createDomain('CollectionModel ' + id)
    const $items = domain.createStore<ItemModelType[]>([])

    const fetchItemsFx = domain.createEffect(async () => await api.getItems(id))

    const createItemFx = domain.createEffect(
        async (title: string) => await api.createItem(id, title),
    )

    const deleteItemFx = domain.createEffect(
        async (itemId: string) => await api.deleteItem(id, itemId),
    )

    $items
        .on(fetchItemsFx.doneData, (_, {items}) => items.map(createItemModel))
        .on(createItemFx.doneData, (items, {item}) => [
            createItemModel(item),
            ...items,
        ])
        .on(deleteItemFx.done, (items, {params}) =>
            items.filter((t) => t.id !== params),
        )

    return {
        $items,
        fetchItemsFx,
        createItemFx,
        deleteItemFx,
    }
}
