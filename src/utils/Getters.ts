export function getItemByName<Type extends { name: string }>(
    list: Array<Type>,
    itemName: string
): Type | undefined {
    return list.find(({ name }: Type) => name === itemName);
}

export function getItemById<Type extends { id: string }>(
    list: Array<Type>,
    itemId: string
): Type | undefined {
    return list.find(({ id }: Type) => id === itemId);
}
