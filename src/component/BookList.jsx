import React, { useState, useEffect } from 'react';
import { API_URL, API_URL1 } from '../API';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [inputs, setInputs] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    window.onload = function () {
        localStorage.clear()
    }

    useEffect(() => {
        const headers = {
            'Authorization': 'whatever-you-want',
        };
        axios.get(API_URL, { headers })
            .then((res) => {
                setBooks(res.data.books);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

    const handleSearch = async () => {
        const headers = {
            'Authorization': 'whatever-you-want',
        };

        const requestBody = {
            query: inputs,
            maxResults: 30,
        };

        axios.post(`${API_URL1}/search`, requestBody, { headers })
            .then(response => {
                setSearchResults(response.data.books);
            })
            .catch(error => {
                console.error('Error searching books:', error);
            }, []);
    };

    const filteredBooks = inputs!=="" ? searchResults : books;

    const userData = localStorage.getItem("userData") ? <div style={{color:"white",fontWeight:"bold",fontSize:'20px',width:'200px',color:'red',fontFamily:'monospace',textAlign:'center'}}>Hello {localStorage.getItem("userData") }</div> : ""

    return (
        <>
            <div className='topContainer'>
                <div className='navBar'>
                    <span className='navOption'>
                        <div id='logoContainer'><img className='logo' src="./src/assets/kbLogo.png" alt="logo" />
                            <span className='lName'>KALVIUM BOOKS</span></div>
                        {userData ? userData : (<button className='registerBtn'><Link to="/register">Register</Link></button>)}

                    </span>
                </div>
                <img className='bgImg' src="https://img.freepik.com/free-vector/online-library-isometric_98292-7026.jpg?w=740&t=st=1703182829~exp=1703183429~hmac=ac89c5be826ad72a2e71b4ac0cf2054aa3a67f5866d47cb5d49c86631c68d80b" alt="bg-img" />
                <div className='bgContent'>
                    <span className='con1'>Reading is the best for get idea</span>
                    <br />
                    <span className='con2'>Keep Reading</span>
                </div>
            </div>
            <input
                className='input'
                type="text"
                placeholder="Search books..."
                value={inputs}
                onChange={(e) => {
                    setInputs(e.target.value);
                    handleSearch();
                }}
            />
            {
                console.log(inputs)
            }
            <div className="Card">
                {Array.isArray(filteredBooks) ? (filteredBooks.map((book) => (
                    <div key={book.id} className='bookBox'>
                        {book.imageLinks && book.imageLinks.thumbnail ? (
                            <img className='bookImg' src={book.imageLinks.thumbnail} alt="#" />
                        ) : (
                            <img className='bookImg' alt="No Thumbnail" />
                        )}
                        <p style={{fontFamily:'sans-serif'}}>{book.title}</p>

                        <button id='freeBtn'>FREE</button>
                    </div>
                ))) : <div style={{color:'red',fontSize:'50px'}}>Oops! Sorry not available</div>}
            </div>
        </>
    );
};

export default BookList;