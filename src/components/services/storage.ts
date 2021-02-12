export const tokenKey: string = "token";
export const userKey: string = "user";

export function saveToken(token: string) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUser(user: string) {
    saveToStorage(userKey, user);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
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
