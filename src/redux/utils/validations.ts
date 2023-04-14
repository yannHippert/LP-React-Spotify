import { getItemByOrNull } from '../../utils/Getters';

export const validateMinLength = (name: string, minLength: number = 1) => {
    if (name.trim().length < minLength) {
        throw new Error('Name too short', {
            cause: `The name of a playlist must be at least ${minLength} charcaters long`,
        });
    }
};

export function validateUnique<Type, Key extends keyof Type>(keyName: Key, list: Array<Type>, key: string) {
    if (getItemByOrNull(keyName, list, key) !== undefined) {
        throw new Error('Key already exists', {
            cause: 'The key of this entity must be unique',
        });
    }
}

export function validateUniqueNameNotSelf(list: Array<{ id: string; name: string }>, validationName: string, self: { id: string }) {
    const item = getItemByOrNull('name', list, validationName);
    if (item !== undefined && item.id !== self.id) {
        throw new Error('Name already exists', {
            cause: 'The name of this entity must be unique',
        });
    }
}
