const randomColor = (): string => {
    const hexString = '0123456789abcdef';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
};

export const generateGradient = (): { background: string } => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    return {
        background: `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`,
    };
};
