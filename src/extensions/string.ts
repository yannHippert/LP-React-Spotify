declare global {
    interface String {
        toTitle(): string;
        toHash(): number;
        toSlug(): string;
    }
}

String.prototype.toTitle = function (): string {
    return this.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

String.prototype.toHash = function (): number {
    let hash = 0;
    let chr;
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};

String.prototype.toSlug = function (): string {
    let str = this.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return str;
};

export {};
