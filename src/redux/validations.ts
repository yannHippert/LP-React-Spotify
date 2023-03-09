import { getItemByName } from '../utils/Getters';

export const validateMinLength = (name: string, minLength: number = 1) => {
    if (name.trim().length < minLength) {
        throw new Error('Name too short', {
            cause: `The name of a category must be at least ${minLength} charcaters long`,
        });
    }
};

export const validateUniqueName = (
    list: Array<{ name: string }>,
    validationName: string
) => {
    if (
        list.some(
            ({ name }: { name: string }) =>
                name.toLocaleLowerCase() === validationName.toLocaleLowerCase()
        )
    ) {
        throw new Error('Name already exists', {
            cause: 'The name of this entity must be unique',
        });
    }
};

export function validateUniqueNameNotSelf(
    list: Array<{ id: string; name: string }>,
    validationName: string,
    self: { id: string }
) {
    const item = getItemByName(list, validationName);
    if (item !== undefined && item.id !== self.id)
        throw new Error('Name already exists', {
            cause: 'The name of this entity must be unique',
        });
}

export function getItemById<Type extends { id: string }>(
    list: Array<Type>,
    itemId: string
): Type {
    const item = list.find(({ id }: Type) => id === itemId);
    if (item === undefined)
        throw new Error('Item not found', {
            cause: `No item found with the id ${itemId}`,
        });
    return item;
}
