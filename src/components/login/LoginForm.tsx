import React, { useState, useEffect} from 'react'; 
import { useHistory } from 'react-router-dom';

//Components
import {doLogin} from '../services/utilities';
import { saveToken, saveUser } from '../services/storage';


const LoginForm: React.FC = () =>  { 
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState(false);

  
  const history = useHistory();

  //Wait one second before redirect to the home page
  useEffect(() => {
    if(message) {
        setTimeout(()=> {
            setMessage(false);
            history.push("/");
        
        }, 1000)
    }
  }, [message, history]);

    

    let successMessage = "Successfully logged in";
    //let errorMessage = "Invalid login details";
    

   const onSubmit = (e: any) => {
     e.preventDefault();
   
      doLogin(usernameValue, passwordValue)
        .then((json: any) => {
          if(json.user) {
            setUsernameValue("");
            setPasswordValue("");
            setMessage(true);
            saveToken(json.jwt);
            saveUser(json.user);
            
          }else if(json.error){
            setMessage(false);
          }
      })
   } 

    return (
            <form className="form" onClick={onSubmit}> 
                  <div className="form__element">
                    {message && <p className="form__message form__message--success">{successMessage}</p>}
                    {/* {!message && <p className="form__message form__message--error">{errorMessage}</p>} */}
                  </div>
                <div className="form__element">
                    <label className="form__label">Username&#58;</label>    
                    <input className="form__input" onChange={event => setUsernameValue(event.target.value)} value={usernameValue} name="username" placeholder="Enter your username" />
                </div>
              
                <div className="form__element">
                    <label className="form__label">Password&#58;</label>
                    <input className="form__input" onChange={event => setPasswordValue(event.target.value)} value={passwordValue} name="password" placeholder="Enter a password of min 4 characters" />
                </div>

                <div className="form__element">
                    <label className="form__label"></label>
                    <button className="form__btn form__btn--submit" type="submit">Submit</button>
                </div>
            </form>
          );
      }

export default LoginForm;