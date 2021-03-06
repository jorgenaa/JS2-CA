import {useState, useEffect} from 'react'; 
import {baseUrl} from '../constants/api';

//Components
import SearchBooks from './SearchBooks';
import TableHeading from './TableHeading';
import BookList from './BookList';
import ErrorMessage from '../common/ErrorMessage';
const articlesUrl = baseUrl + "books"; 


 const Home: React.FC = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async ()=> {
            try {
                const response = await fetch(articlesUrl);
                const json = await response.json();
                setBooks(json);
                setFilteredBooks(json);
                setLoading(false);
            } catch(error) {
                console.log(error)
                setServerError(error);
            }
        }
        getBooks();
    }, []);

    const filterBooks = (e: any) => {
        const searchValue = e.target.value.toLowerCase();

        const filteredArray = books.filter((book: any) => {
            const lowerCaseName = book.title.toLowerCase();

        if (lowerCaseName.includes(searchValue)) {
            return true;
			}
			return false;
        });
        setFilteredBooks(filteredArray);
    }
	
    return (
        <main>
            <SearchBooks handleSearch={filterBooks} />
            {loading ? <p className="home--loading">Loading books...</p> : ""}
            {serverError ? <ErrorMessage><span>Error&#58;</span>{serverError}</ErrorMessage> : ""}
            <div className="home">
                <section className="home__bookList">
                    <table className="home__table">
                        <TableHeading />
                        <BookList books={filteredBooks} />  
                    </table>
                </section>
            </div>
        </main>
    )
}

export default Home;