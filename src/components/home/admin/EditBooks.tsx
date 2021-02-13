import { useEffect, useState } from 'react'; 
import { useParams, useHistory } from 'react-router-dom'; 
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../common/ErrorMessage';

//Components
import {editBook, deleteBook} from '../../services/utilities';
import {baseUrl} from '../../constants/api';
const booksUrl = baseUrl + "books/";

const schema = yup.object().shape({
	    title: yup.string().required("Title is required"),
	    genre: yup.string().required("Genre is required"),
	    author: yup.string().required("Author is required"),
	    description: yup.string().required("Description is required")
	 });

interface Props {
	successMessage: string,
    errorMessage: string,
	successDelete: string,
}

const EditBooks: React.FC<Props> = ({successMessage, errorMessage, successDelete}) => {
	const [titleValue, setTitleValue] = useState("");
    const [genreValue, setGenreValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [message, setMessage] = useState(false);

	const {id}: any = useParams();
	const history = useHistory();

	const { register, handleSubmit, errors } = useForm({ 
			  resolver: yupResolver(schema),
		  });

	useEffect(() => {
		fetch(booksUrl + id)
		.then(data => data.json())
		.then(json => {
			setTitleValue(json.title);
			setGenreValue(json.genre);
			setAuthorValue(json.author);
			setDescriptionValue(json.description);
			deleteBook(json.id);
		})
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if(message) {
			setTimeout(()=> {
				setMessage(false);
			}, 1000)
		}
			 // eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);
	 

	const submitForm = (e: any) => {
		editBook(id, titleValue, genreValue, authorValue, descriptionValue)
		.then((json: any)=> {

			if(json.updated_at) {
				setMessage(true);
			
			}else if(json.error) {
				setMessage(false);
			}
		})
		.catch((error: any) => {
			console.log(error)
		})
	};


	const deleteBtn = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		//eslint-disable-next-line no-restricted-globals
		let doDelete = confirm("Are you sure you want to delete the book");
		console.log(doDelete);
		if(doDelete){ 
			deleteBook(id)
			
			.catch((error: any) => {
				console.log(error);
			})
		}
		history.push('/')
	}

	successMessage = "Book is successfully updated";
	errorMessage = "An error occured";

	return ( 
		<main>
			<h1 className="title">Edit Books</h1>
			<form className="form" > 
				
				<div className="form__element">
				 	{message && <p className="form__message form__message--success">{successMessage}</p>}
				{/* {message === false ? <p className="form__message form__message--error">{errorMessage}</p> : ""} */}
				</div>

				<div className="form__element">
					<label className="form__label">Title&#58;</label>    
					<input className="form__input" onChange={event => setTitleValue(event.target.value)} value={titleValue} name="title" ref={register} />
					{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</div>
			
				<div className="form__element">
					<label className="form__label">Genre&#58;</label>
					<input className="form__input" onChange={event => setGenreValue(event.target.value)} value={genreValue} name="genre" ref={register} />
					{errors.genre && <ErrorMessage>{errors.genre.message}</ErrorMessage>}
				</div>

				<div className="form__element">
					<label className="form__label">Author&#58;</label>
					<input className="form__input" onChange={event => setAuthorValue(event.target.value)} value={authorValue} name="author" ref={register} />
					{errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
				</div>

				<div className="form__element">
					<label className="form__label">Description&#58;</label>
					<textarea className="form__description" onChange={event => setDescriptionValue(event.target.value)} value={descriptionValue} name="description" ref={register} />
					{errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
				</div>
			
				<div className="form__element">
					<input className="form__input" type="hidden" name="id" />
				</div> 

				<div className="form__element">
					<label className="form__label"></label>
					<button className="form__btn form__btn--submit" onClick={handleSubmit(submitForm)}>Update</button>
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

			
	