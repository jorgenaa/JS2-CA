import { useContext, useEffect} from 'react'; 
import FavBtn from '../favourites/FavBtn';
import { MdEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import AuthContext from "../common/AuthContext";

interface Props {
    books: any;
}

const BookList:React.FC<Props> = ({books}) => {
    const [auth, ] = useContext(AuthContext);
    const history = useHistory();
    const handleClick = (id: number) => {
        history.push(`/editBooks/${id}`)
   }

   useEffect(() => {}, [books.length]);

   if(books.length === 0) {
        <tbody>
            <tr>
                <td>Book list is empty</td>
            </tr>
        </tbody>
}
    return (
        <>
            {books.map((books: any) => {
                const {id, title, description, genre, author} = books;
               
                    return(
                        <tbody key={id}>
                            <tr>
                                <td className="home__td">{title}</td>
                                <td className="home__td">{genre}</td>
                                <td className="home__td">{author}</td>
                                <td className="home__td">{description}</td>
                                <td className="home__td"> 
                                    <FavBtn
                                        key={id}
                                        id={id}
                                        title={title}
                                        author={author}
                                        genre={genre}
                                        description={description}
                                    />   
                                </td>
                                <td className="home__td">{auth ?<button className="home__edit-btn" onClick={()=> handleClick(id)}><MdEdit className="home__edit-icon"/></button>: "" }</td>
                            </tr>
                        </tbody>
                    )
                })}
        </> 
    )
}

export default BookList
