
import { FaSearch } from 'react-icons/fa';

export default function SearchBooks({ handleSearch }) {
    return (
            <section className="search-box">
                <input className="search-box__input search-box__input--active" 
                        type="text"  
                        placeholder="search by name..." 
                        onChange={event => handleSearch(event)} />

                <FaSearch className="search-box__icon" />
            </section>
            )
        }

