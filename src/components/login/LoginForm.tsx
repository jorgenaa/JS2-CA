import React, { useState, useEffect} from 'react'; 
import { useHistory } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import Message from '../common/Message';
import ErrorMessage from '../common/ErrorMessage';
import {doLogin} from '../services/utilities';
import { saveToken, saveUser } from '../services/storage';

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
    //.min(4, "Password must be at least 4 characters long")
    .max(30, "Password must be less than 30")
 });

interface Props  {
  successMessage: string,
  errorMessage: string
}

const LoginForm: React.FC<Props> = ({successMessage, errorMessage}) =>  { 
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({ 
    resolver: yupResolver(schema),
  });

  //Wait one second before redirect to the home page
  useEffect(() => {
    if(message) {
        setTimeout(()=> {
            setMessage(false);
            history.push("/");
        
        }, 1000)
    }
 
  }, [history, message]);

    successMessage = "Successfully logged in";
    errorMessage = "Invalid login details";
    
   const onSubmit = async () => {
  
      doLogin(usernameValue, passwordValue)
        .then((json: any) => {
          if(json.user) {
            setUsernameValue("");
            setPasswordValue("");
            setMessage(true);
            setErrorMsg(false);
            saveToken(json.jwt);
            saveUser(json.user);
          
          }else if(json.error){
            setMessage(false);
            setErrorMsg(true);
          }
      })
      .catch((error: any) => {
        console.log(error)
      })
   } 

  return (
          <form className="form" onClick={handleSubmit(onSubmit)}> 
                <div className="form__element">
                  {message && <Message>{successMessage}</Message>}
                  {errorMsg && <ErrorMessage>{errorMessage}</ErrorMessage>} 
                </div>
              <div className="form__element">
                  <label className="form__label">Username&#58;</label>    
                  <input className="form__input" onChange={event => setUsernameValue(event.target.value)} value={usernameValue.trim()} name="username" placeholder="Enter your username" ref={register} />
                  {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}  
              </div>
            
              <div className="form__element">
                  <label className="form__label">Password&#58;</label>
                  <input className="form__input" onChange={event => setPasswordValue(event.target.value)} value={passwordValue.trim()} name="password" placeholder="Enter a password of min 4 characters" ref={register} />
                  {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </div>

              <div className="form__element">
                  <label className="form__label"></label>
                  <button className="form__btn form__btn--submit" type="submit">Submit</button>
              </div>
          </form>
        );
    }

export default LoginForm;