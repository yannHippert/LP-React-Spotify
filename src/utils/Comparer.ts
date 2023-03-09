export function compare<Type>(a: Type, b: Type): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}
