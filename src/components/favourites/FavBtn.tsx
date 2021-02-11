import {useState} from 'react'; 
import { FaHeart } from 'react-icons/fa';
import { getExistingFavourites } from './getExitingFavs';

interface Props {
    title: string;
    genre: string;
    description: string;
    author: string;
    id: number;
     }

const FavBtn: React.FC<Props> = ({id, title, genre, description, author}) => {
    const [toggle, setToggle] = useState(false);
    const localStorageKey : string = 'favourite';
    let cssClass : string = "home__favourite-btn home__favourite-btn--unselected";
    const favourites = getExistingFavourites();

    //Check through favs array
    //does the game id exist in the favs array
    function checkDoexObekctExist(){
        const doesObjectExist = favourites.find((fav: { id: number; }) => {
            return fav.id === id;
        })
        if(doesObjectExist) {
            cssClass= "home__favourite-btn home__favourite-btn--selected"
        }
    }
    checkDoexObekctExist();

    const saveFavorites = (favorite: any) => {
        localStorage.setItem(localStorageKey, JSON.stringify(favorite));
    }

    const handleFavouriteToggle = () => {
        
        setToggle(!toggle);
        
        const currentFavorites = getExistingFavourites();

        const articleExist = currentFavorites.find((fav: { id: number; }) => {
            return fav.id === id;
        })
        const book = {id, title, genre, description, author};
        
        if(articleExist === undefined){
            currentFavorites.push(book) 
            saveFavorites(currentFavorites)
        }  else {
            const newFavs = currentFavorites.filter((fav: { id: number; }) => {
                return fav.id !== id
            })
            saveFavorites(newFavs)
        }  
    }

    return (
       <FaHeart 
            title="Add to favourite"
            onClick={handleFavouriteToggle}
            className={cssClass} 
        />
    )
}

export default FavBtn;
