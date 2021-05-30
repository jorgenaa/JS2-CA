import {  useEffect, useState } from 'react'; 
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
	const [inputValues, setInputValues] = useState({title: "", genre: "", description: "", author: ""})
    const [message, setMessage] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const {id}: any = useParams();
	const history = useHistory();
	
	const { register, handleSubmit, errors, reset } = useForm({  
		resolver: yupResolver(schema),
		defaultValues: inputValues,
		
	});

	useEffect(() => {
		const fetchData = async ()=> {
			fetch(booksUrl + id)
			.then(data => data.json())
			.then(json => {
				setInputValues(json);
				reset(json)
			})
		}
		fetchData();
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submitForm = async (data: any) => {
	try {
		const response = await fetch(booksUrl + id, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
			  'Content-Type': 'application/json',
			  Authorization: `Bearer ${token}`
			}
		  })
		  const json = await response.json();
		  if(json.updated_at) {
			setMessage(true);
			setErrorMsg(false);
			setTimeout(()=> {
				setMessage(false);
				history.push("/");
			}, 1000)
		  } if(json.error) {
			setErrorMsg(true);
		  }
	}catch(error) {
		console.log(error)
		setMessage(false);
		setErrorMsg(true);
	}
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
					<input className="form__input" name="title" ref={register} />
					{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</div>
				<div className="form__element">
					<label className="form__label">Genre&#58;</label>
					<input className="form__input" name="genre" ref={register} />
					{errors.genre && <ErrorMessage>{errors.genre.message}</ErrorMessage>}
				</div>
				<div className="form__element">
					<label className="form__label">Author&#58;</label>
					<input className="form__input" name="author" ref={register} />
					{errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
				</div>
				<div className="form__element">
					<label className="form__label">Description&#58;</label>
					<textarea className="form__description" name="description" ref={register} />
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
					<DeleteButton id={id} deleteBook={deleteBook} />  
				</div>
			</form> 	 
		</main>
	);
};

export default EditBooks;

			
	