const randomColor = (): string => {
    const hexString = '0123456789abcdef';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
};

export const generateGradient = (): string => {
    const colorOne = randomColor();
    const colorTwo = randomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};

const seededColor = (seed: number) => {
    const color = Math.floor(Math.abs(Math.sin(seed) * 16777215)).toString(16);
    return `#${[Array(6 - color.length).fill('0'), color].join('')}`;
};

const seededAngle = (seed: number) => {
    return Math.floor(Math.abs(Math.sin(seed) * 16777215))
        .toString()
        .substring(0, 2);
};

export const seededGradient = (seed: number) => {
    const salt = 'Playing around with the salt 12'.toHash();
    const colorOne = seededColor(seed);
    const colorTwo = seededColor(seed + salt);
    let angle = seededAngle(seed);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};
