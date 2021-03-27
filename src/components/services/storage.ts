export const tokenKey: string = "token";


export function saveToken(token: string) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function clearStorage() {
    localStorage.clear();
}

function saveToStorage(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key: string) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}
