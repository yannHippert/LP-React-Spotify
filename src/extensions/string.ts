declare global {
    interface String {
        toTitle(): string;
        toHash(): string;
    }
}

String.prototype.toTitle = function (): string {
    return this.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

String.prototype.toHash = function (): string {
    let hash = 0;
    let chr;
    if (this.length === 0) return hash.toString();
    for (let i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash.toString();
};

export {};
