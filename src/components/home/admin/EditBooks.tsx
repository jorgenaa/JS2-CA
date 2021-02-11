import { useEffect, useState } from 'react'; //
import { useParams, useHistory } from 'react-router-dom'; //

//Components
import {editBook} from '../../services/utilities';
import {deleteBook} from '../../services/utilities';
import {baseUrl} from '../../constants/api';
const booksUrl = baseUrl + "books/";

interface Props {
	successMessage: string;
    errorMessage: string;
}

const EditBooks: React.FC<Props> = ({successMessage, errorMessage}) => {
	const [titleValue, setTitleValue] = useState("");
    const [genreValue, setGenreValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [message, setMessage] = useState(false);

	const {id}: any = useParams();
	
	const history = useHistory();

	useEffect(() => {
		fetch(booksUrl + id)
		.then(data => data.json())
		.then(json => {
			setTitleValue(json.title);
			setGenreValue(json.genre);
			setAuthorValue(json.author);
			setDescriptionValue(json.description);
		})
	}, [id]);

	useEffect(() => {
		if(message) {
			setTimeout(()=> {
				if (!id) {
					history.push("/");
					setMessage(false);
				}
			
			}, 1000)
		}
		}, [message, history, id]);
	 
		

	const submitForm = (e: any) => {
		e.preventDefault();

		editBook(id, titleValue, genreValue, authorValue, descriptionValue)
		.then((json: any)=> {
			console.log(json)
            if(json.updated_at) {
                setMessage(true);
                setTitleValue("");
                setGenreValue("");
                setAuthorValue("");
                setDescriptionValue("");
            }else if(json.error) {
                setMessage(false);
            }
        })
	};

	const deleteBtn = (e: any) => {
		e.preventDefault();
		deleteBook(id)
	}

	successMessage = "Book is successfully updated";
	errorMessage = "An error occured";

	return ( 
		<main>
			<h1 className="title">Edit Books</h1>
			<form className="form" onClick={submitForm}> 
				
				<div className="form__element">
				 	{message && <p className="form__message form__message--success">{successMessage}</p>}
				{/* {message === false ? <p className="form__message form__message--error">{errorMessage}</p> : ""} */}
				</div>

				<div className="form__element">
					<label className="form__label">Title&#58;</label>    
					<input className="form__input" onChange={event => setTitleValue(event.target.value)} value={titleValue} name="title" />
				</div>
			
				<div className="form__element">
					<label className="form__label">Genre&#58;</label>
					<input className="form__input" onChange={event => setGenreValue(event.target.value)} value={genreValue} name="genre" />
				</div>

				<div className="form__element">
					<label className="form__label">Author&#58;</label>
					<input className="form__input" onChange={event => setAuthorValue(event.target.value)} value={authorValue} name="author"/>
				</div>

				<div className="form__element">
					<label className="form__label">Description&#58;</label>
					<textarea className="form__description" onChange={event => setDescriptionValue(event.target.value)} value={descriptionValue} name="description" />
				</div>
			
				<div className="form__element">
					<input className="form__input" type="hidden" name="id" />
				</div> 

				<div className="form__element">
					<label className="form__label"></label>
					<button className="form__btn form__btn--submit" type="submit">Update</button>
				</div>

				<div className="form__element">
					<label className="form__label"></label>
					<button className="form__btn form__btn--delete" onClick={deleteBtn}>Delete</button> 
				</div>
			</form> 
			 
		</main>
	);
};

export default EditBooks;

			
	