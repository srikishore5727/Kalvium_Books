import React, { useState } from 'react';
import { get, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './RegisterForm.css'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isvalid },
        getValues,
    } = useForm();

    const [successMessage, setSuccessMessage] = useState('');
    const [userData, setUserData] = useState(null);

    const onSubmit = (data) => {
        setSuccessMessage('Registration successful!');
        setUserData(data);
        console.log('Form data:', data);
    };

    successMessage && !isvalid ? localStorage.setItem("userData", getValues("name")) : null

    return (
        <div>
            <div className='container'>

            </div>
            <div className='containerOne'>
                    <img className='kbLogo' src="./src/assets/kalviumBook_logos.png"/>
            </div>
            <div className='registerForm'>
                <h1>Sign up for <span style={{ color: 'red', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Kalvium Books</span></h1>
                {successMessage && (
                    <div className='successMessage'>
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.name && <span className='error'>{errors.name.message}</span>}
                    <input
                        {...register('name', {
                            required: 'Name is required',
                            minLength: { value: 3, message: 'Name should be at least 3 characters' },
                            maxLength: { value: 30, message: 'Name should not exceed 30 characters' },
                        })}
                        type='text'
                        placeholder='Enter your name'
                    />

                    {errors.email && <span className='error'>{errors.email.message}</span>}

                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                        type='email'
                        placeholder='Enter your email'
                    />

                    {errors.password && <span className='error'>{errors.password.message}</span>}
                    <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 10, message: 'Password should be at least 10 characters' },
                            pattern: {
                                value: /.*[!@#$%^&*(),.?":{}|<>].*/,
                                message: 'Password should contain at least one special character',
                            },
                        })}
                        type='password'
                        placeholder='Enter password'
                    />

                    {errors.repeatPassword && (
                        <span className='error'>{errors.repeatPassword.message}</span>
                    )}
                    <input
                        {...register('repeatPassword', {
                            required: 'Repeat Password is required',
                            validate: (value) =>
                                value === getValues('password') || 'Passwords do not match',
                        })}
                        type='password'
                        placeholder='Rewrite password'
                    />


                    <button className='signupBtn' type='submit' disabled={Object.keys(errors).length > 0}>
                        {
                            successMessage && !isvalid ? <Link style={{ textDecoration: 'none', color: 'white' }} to="/">Back to Home</Link> : "Sign Up"
                        }
                    </button>
                </form>
            </div>
        </div>

    );
};

export default RegisterForm;
