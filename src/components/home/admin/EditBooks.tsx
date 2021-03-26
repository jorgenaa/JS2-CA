import { useEffect, useState } from 'react'; 
import { useParams, useHistory } from 'react-router-dom'; 
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import Message from '../../common/Message';
import ErrorMessage from '../../common/ErrorMessage';
import { deleteBook} from '../../services/utilities';
import DeleteButton from './DeleteButton';
import { getToken } from '../../services/storage';
import {baseUrl} from '../../constants/api';
const booksUrl = baseUrl + "books/";
const token = getToken();

const schema = yup.object().shape({
	    title: yup.string().required("Title is required"),
	    genre: yup.string().required("Genre is required"),
	    author: yup.string().required("Author is required"),
	    description: yup.string().required("Description is required")
	 });


const EditBooks: React.FC = () => {
	const [titleValue, setTitleValue] = useState("");
    const [genreValue, setGenreValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [message, setMessage] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [currentId, setCurrentId] = useState("")
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
			setCurrentId(json.id)
		})
	
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
		
		const editBook = async( title: string, genre: string, author: string, description: string) => {
 
			const data = JSON.stringify({title: title, genre: genre, author: author, description: description });
		 	console.log(booksUrl + id)
			fetch(booksUrl + id, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			  },
			  body: data
			})
			  .then(data => data.json())
		   }

	const submitForm = () => {
		editBook(titleValue, genreValue, authorValue, descriptionValue)
		.then(()=> {
				setMessage(true);
				setErrorMsg(false);
		})
		//Wait one second before redirect to the home page
      .then(() => {
         setTimeout(()=> {
            setMessage(false);
            history.push("/");
        }, 1000)
      })
		.catch((error: any) => {
			console.log(error)
			setMessage(false);
			setErrorMsg(true);
		})
	};
 	

	return ( 
		<main>
			<h1 className="title">Edit Books</h1>
			<form className="form" onSubmit={handleSubmit(submitForm)}> 
				<div className="form__element">
				 	{message && <Message>Book is successfully updated</Message>}
				    {errorMsg && <ErrorMessage>An error occured</ErrorMessage>} 
				</div>
				<div className="form__element">
					<label className="form__label">Title&#58;</label>    
					<input className="form__input" onChange={event => setTitleValue(event.target.value)} value={titleValue.trim()} name="title" ref={register} />
					{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</div>
				<div className="form__element">
					<label className="form__label">Genre&#58;</label>
					<input className="form__input" onChange={event => setGenreValue(event.target.value)} value={genreValue.trim()} name="genre" ref={register} />
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
					<button className="form__btn form__btn--submit" >Update</button>
				</div>
				<div className="form__element">
					<label className="form__label"></label>
					 <DeleteButton id={currentId} deleteBook={deleteBook} /> 
					
				</div>
			</form> 	 
		</main>
	);
};

export default EditBooks;

			
	