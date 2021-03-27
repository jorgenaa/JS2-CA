import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import Message from '../common/Message';
import ErrorMessage from '../common/ErrorMessage';
import AuthContext from "../common/AuthContext";
import {baseUrl} from '../constants/api';

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
    //.min(4, "Password must be at least 4 characters long")
    .max(30, "Password must be less than 30")
 });

const LoginForm= () =>  { 
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({ 
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);
  console.log(auth);
  const url = baseUrl + "auth/local";
  const data = ({identifier: usernameValue, password: passwordValue});

  const onSubmit = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json",
        }
      })
      .then(data => data.json())
      .then((json) => {
        if(json.user.username === usernameValue) {
          setUsernameValue("");
          setPasswordValue("");
          setMessage(true);
          setErrorMsg(false);
          setAuth(json.jwt);
        }
      })
      //Wait one second before redirect to the home page
      .then(() => {
            setTimeout(()=> {
            setMessage(false);
            history.push("/");
        }, 1500)
      })
      .catch((error) => {
        console.log(error)
        setMessage(false);
          setErrorMsg(true);
      })
      .finally(()=>  {
        setMessage(true);
      })
   } 
//disabled={message}
  return (
          <form className="form" onSubmit={handleSubmit(onSubmit)}> 
                <div className="form__element">
                  {message && <Message>Successfully logged in</Message>}
                  {errorMsg && <ErrorMessage>Invalid login details</ErrorMessage>} 
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