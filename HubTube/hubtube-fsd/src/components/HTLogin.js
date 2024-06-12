import React from 'react';
import '../CSS files/HTLogin.css';
import logimg from '../images/num1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export class UserData {
    constructor() {
        this.username = '';
        this.usermail = '';
        this.dob='';
        this.contributions='';
        this.userID = '';
    }

    setUserData(username, usermail,dob,contributions, userID) {
        this.username = username;
        this.usermail = usermail;
        this.dob = dob;
        this.contributions=contributions;
        this.userID = userID;
        console.log(username, usermail, userID);
    }

    getUserData() {
        return {
            username: this.username,
            usermail: this.usermail,
            dob:this.dob,
            contributions:this.contributions,
            userID: this.userID,
        };
    }
}

const HTLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const userData = new UserData();

    const Loginbtnclick = async () => {
        const Usermail = document.getElementById('Usermail').value;
        const Password = document.getElementById('Password').value;
        if (Usermail === '' || Password === '') {
            toast.warning('Please Enter all Credentials');
            return;
        }
        try {
            const response = await fetch('http://localhost:4008/api/finduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Usermail, Password }),
            });
            if (response.ok) {
                const userDataResponse = await response.json();
                
                toast.success("Login Success");
                login();
                userData.setUserData(userDataResponse.Username, userDataResponse.Usermail,userDataResponse.DateofBirth,userDataResponse.Contributions, userDataResponse.UserID); // Use userData instance
                navigate('/Home', { state: { userData: userData.getUserData() } });
            } else {
                console.error('Error:', response.statusText);
                toast.error('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <>
            <div className="fullpage3">
                <div className="block21">
                    <img src={logimg} className="img1" alt="NUMBER1" />
                    <button className="signinbtn" type="button" onClick={() => window.location.href = "/Signup"}>Sign Up</button>
                    <ToastContainer position="top-right" />
                </div>
                <div className="block22">
                    <h1>Sign In</h1>
                    <form className="signin">
                        <input className="signininbox" id="Usermail" type="email" placeholder="Email" />
                        <input className="signininbox" id="Password" type="password" placeholder="Password" />
                        <div className="homebtn">
                            <h4>Get back to home</h4>
                            <button onClick={() => navigate('/')}>Click me</button>
                        </div>
                        <button type="button" onClick={Loginbtnclick} className="regbtn">Dive In</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default HTLogin;
