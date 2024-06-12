import React, { useState } from "react";
import '../CSS files/HTSignup.css';
import logimg from '../images/num1.png';
import HTSignin from "./HTLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HTSignup = () => {
    const [isLoginVisible, setLoginVisible] = useState(false);

    const Signin = () => setLoginVisible(true);

    if (isLoginVisible) {
        return <HTSignin />;
    }

    const Signupbtnclick = async () => {
        const Username = document.getElementById('Username').value;
        const Usermail = document.getElementById('Usermail').value;
        const DateofBirth = document.getElementById('Userdob').value;
        const Password = document.getElementById('Password').value;
        const CPassword = document.getElementById('CPassword').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(Usermail);
        const isPasswordValid = Password.length > 8;

        if (Username === '' || Usermail === '' || Password === '') {
            toast.error('Please Enter all Credentials');
            return;
        }

        if (!isEmailValid) {
            toast.warning('Please enter a valid email address');
            return;
        }

        if (Password !== CPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (!isPasswordValid) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await fetch('http://localhost:4008/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Username, Usermail, DateofBirth, Password }),
            });

            if (response.ok) {
                const message = await response.text();
                if (message === 'User Created Successfully') {
                    const confirmed = window.confirm('Account Created Successfully. Click OK to continue.');
                    if (confirmed) {
                        toast.success('Account Created Successfully. Click OK to continue.');
                        setLoginVisible(true);
                    }
                } else {
                    console.log(message);
                }
            } else {
                // Handle other response statuses
                const errorMessage = await response.text();
                if (errorMessage === 'User Already Exists') {
                    // User with the same email already exists
                    toast.error('User Already Exists');
                } else {
                    // Other error
                    console.error('Error:', errorMessage);
                    toast.error('Some problem occurred. Please try again later.');
                }
            }
        } catch (error) {
            // Handle network errors
            console.error('Error:', error);
            toast.error('Error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <>
            <div className="fullpage2">
                <div className="block11">
                    <img src={logimg} className="img1" alt="NUMBER1" />
                    <button className="signinbtn" onClick={Signin} type="button">Sign In</button>
                    <ToastContainer position="top-right" />
                </div>
                <div className="block12">
                    <h1>Sign Up</h1>
                    <form className="signup">
                        <input className="signupinbox" id="Username" type="text" placeholder="Name" />
                        <input className="signupinbox" id="Usermail" type="email" placeholder="Email" />
                        <input className="dobbox" type="date" id="Userdob" placeholder="Date of Birth" />
                        <input className="signupinbox" id="Password" type="password" placeholder="Password" />
                        <input className="signupinbox" id="CPassword" type="password" placeholder="Confirm Password" />
                        <button type="button" className="regbtn" onClick={Signupbtnclick}>Register</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default HTSignup;
