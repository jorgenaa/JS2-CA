import {getToken} from './storage';
import {baseUrl} from '../constants/api';
const booksUrl = baseUrl + "books/";
const token = getToken();

// Retrieve resources
export const getBookList = () => {
    return fetch(booksUrl)
    .then(data => data.json())
}

//POST request for loggin
export const doLogin = async (username: string, password: any) => {
    const url = baseUrl + "auth/local";
    const data = ({identifier: username, password: password});

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
          "Content-Type": "application/json",
      }
    })
     .then(data => data.json())
}

//POST request for adding books
export const setBook = async (title: string, genre: string, author: string, description: string) => {
   
    const data = JSON.stringify({title: title, genre: genre, author: author, description: description });

    return fetch(booksUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(data => data.json())
   }


//Delete requesat for deleting books
export const deleteBook = async (id: any) => {

  return fetch(booksUrl + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then(data => data.json())
 }