export function compare<Type>(a: Type, b: Type): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function sortBy<Type, Key extends keyof Type>(key: Key, list: Array<Type>, isAscending = true) {
    const order = isAscending ? 1 : -1;
    return [...list].sort((a, b) => {
        const aVal = a[key]?.toString() ?? '';
        const bVal = b[key]?.toString() ?? '';
        return order * aVal.localeCompare(bVal);
    });
}
