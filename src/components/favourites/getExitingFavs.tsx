export const getExistingFavourites = () => {
    const favs : string | null = localStorage.getItem('favourite');

    return !favs ? [] : JSON.parse(favs);

}