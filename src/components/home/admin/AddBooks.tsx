import { useState } from 'react'; 
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import ErrorMessage from '../../common/ErrorMessage';
import Message from '../../common/Message';
import {setBook} from '../../services/utilities';

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    genre: yup.string().required("Genre is required"),
    author: yup.string().required("Author is required"),
    description: yup.string().required("Description is required")
 });

const AddBooks: React.FC = () =>  { 
    const [message, setMessage] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const { register, handleSubmit, errors, reset } = useForm({ 
        resolver: yupResolver(schema),
    });

	const submitForm = (data: any) => {
        setBook(data.title, data.genre, data.author, data.description)
        .then(()=> {
            setMessage(true);
            setErrorMsg(false);
           
        })
        .then(()=> {
            setTimeout(()=> {
                setMessage(false);
              }, 1500)
        })
        .catch((error: any) => {
            console.log(error)
            setErrorMsg(true);
        })
        .finally(() => {
            reset()
        })
       
     }
     
    return (
            <main>
                <h1 className="title">Add Books</h1>
                <form className="form" onSubmit={handleSubmit(submitForm)}> 
                    <div className="form__element">
                       {message && <Message>Book is successfully added</Message>}
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
                        <label className="form__label"></label>
                        <button className="form__btn form__btn--submit" type="submit">Add</button>
                    </div>
                </form>
            </main>
    );
}

 
export default AddBooks;