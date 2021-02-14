import { useHistory } from 'react-router-dom'; 

    interface Props {
        id: any,
        deleteBook: any
    }

    const DeleteButton:React.FC<Props> = ({id, deleteBook}) => {
        const history = useHistory();

        const deleteBtn = () => {
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
        return <button className="form__btn form__btn--delete" onClick={deleteBtn}>Delete</button>
    }
    
    export default DeleteButton;
    