export const getRandomElement = (list: Array<any>) => {
    return list[(list.length * Math.random()) << 0];
};

export function getRandomSublist<Type>(list: Array<Type>): Array<Type> {
    const itemCount = getRandomInt(10, Math.min(55, list.length / 4));
    const sublist: Array<Type> = [];
    while (sublist.length !== itemCount) {
        const item = getRandomElement(list);
        if (!sublist.includes(item)) sublist.push(item);
    }
    return sublist;
}

export const getRandomInt = (min = 0, max = 10) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export function getItemBy<Type, Key extends keyof Type>(keyName: Key, list: Array<Type>, key: any) {
    const item = getItemByOrNull(keyName, list, key);
    if (item === null || item === undefined)
        throw new Error('Item not found', {
            cause: `No item found with the ${keyName.toString()} ${key}`
        });
    return item;
}

export function getItemByOrNull<Type, Key extends keyof Type>(keyName: Key, list: Array<Type>, key: any) {
    return list.find((item: Type) => item[keyName] === key);
}

export function getItemById<Type extends { id: string }>(list: Array<Type>, itemId: string): Type {
    return getItemBy('id', list, itemId);
}

export function getItemOrNullById<Type extends { id: string }>(list: Array<Type>, itemId: string): Type | undefined {
    return list.find(({ id }: Type) => id === itemId);
}

export function mapToList<Type, Key extends keyof Type>(map: Type, keys: Array<Key>) {
    return keys.map((key) => map[key]);
}
