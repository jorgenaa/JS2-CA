import {useState, useEffect} from 'react'; 
import {baseUrl} from '../constants/api';

//Components
import SearchBooks from './SearchBooks';
import TableHeading from './TableHeading';
import BookList from './BookList';
import Sidebar from '../home/Sidebar'
import ErrorMessage from '../common/ErrorMessage';

const articlesUrl = baseUrl + "books"; 

 const Home: React.FC = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(articlesUrl)
        .then(response => response.json())
        .then(json => {
            setBooks(json);
            setFilteredBooks(json);
            setLoading(false);
           
        })
        .catch((error:any) => {
            console.log(error)
            setError(error);
           
        })
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
            {loading ? <p>Loading books</p> : ""}
            {error ? <ErrorMessage><span>Error&#58;</span>{error}</ErrorMessage> : ""}
            <div className="home">
                <Sidebar />
                <section className="home__bookList">
                    <table className="home__table">
                        <TableHeading />
                        <BookList filteredBooks={filteredBooks} />  
                    </table>
                </section>
            </div>
        </main>
    )
}

export default Home;