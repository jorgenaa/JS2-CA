import {useState} from "react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

//Components
import { getExistingFavourites } from "./getExitingFavs";
import TableHeading from '../home/TableHeading';

const Favourites: React.FC = () => {
    const [favourites, setFavourites] = useState(getExistingFavourites());
    
    const clearLocalStorage = () => {
        localStorage.clear();
        setFavourites([]);
    }

    // Render message if no favourites exist.
    // Render clear button if favourites exist
    let clearBtn : string | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    let message : React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> | string;
    if(favourites.length === 0) {
        message = <p className="favourite__message">No favourites yet</p>;
        clearBtn = "";
    }else {
        message = "";
        clearBtn = <div className="favourite__clear">
                        <button className="favourite__clear-btn" onClick={clearLocalStorage}>Clear Local Storage <FaTrashAlt /></button>
                    </div> ;
        }

    return (
            <main className="favourite">
                {message}
                {clearBtn}
                <table className="home__table">
                <TableHeading />
                {favourites.map((favourite: { title: string; id: number; genre: string, description: string, author: string}) => {
                    const { title, id, genre, description, author} = favourite;
                    return (
                            <tr className="home__tr" key={id}>
                                <td className="home__td">{title}</td>
                                <td className="home__td">{genre}</td>
                                <td className="home__td">{author}</td>
                                <td className="home__td">{description}</td>
                                <td className="home__td"> 
                                    <FaHeart className={"home__favourite-btn home__favourite-btn--selected"} />   
                                </td>
                               
                            </tr>
                            )
                        })}
                </table>
             </main>
            )
        }

export default Favourites;
