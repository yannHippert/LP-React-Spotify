export const getBaseUrl = (): string => {
    alert('getBaseUrl');

    const url = window.location.hostname;
    return url.includes('github') ? '/' : '/LP-React-Spotify/';
};
