export const getRandomString = () => {
    return (Math.random() + 1).toString(36).substring(7) + '-' + (Math.random() + 1).toString(36).substring(7);
};

const randomColor = (): string => {
    const hexString = '0123456789abcdef';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
};

export const generateGradient = (): string => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};
