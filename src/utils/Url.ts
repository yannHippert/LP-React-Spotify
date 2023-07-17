export const getBaseUrl = (): string => {
    const url = window.location.hostname;
    return url.includes('github') ? '/LP-React-Spotify' : '';
};
