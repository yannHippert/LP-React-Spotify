export const getRandomString = () => {
    return (Math.random() + 1).toString(36).substring(7) + '-' + (Math.random() + 1).toString(36).substring(7);
};

export const getRandomId = () => {
    return (Math.random() + 1).toString(36).substring(2);
};
