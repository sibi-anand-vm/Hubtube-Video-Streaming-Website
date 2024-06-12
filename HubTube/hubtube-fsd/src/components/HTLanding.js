import React, { useState } from "react";
import logimg from '../images/num1.png'
import '../CSS files/HTLanding.css'
import HTSignup from "./HTSignup";
import HTLogin from "./HTLogin.js"
const HTLanding = () => {
  const [isSignupvisible, setSignupvisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const Signup = () =>setSignupvisible(true);
  const Signin =()=>setLoginVisible(true);
  if(isLoginVisible){
    return <HTLogin />
  }
  if(isSignupvisible){
    return <HTSignup/>;
   }
  return (
    <>
      <div className="fullpage1">
        <div className="block1">
          <img className="img1" src={logimg} alt="Number 1" />
          <button className="signinbtn" onClick={()=>Signin()} type="button">Sign In</button>
        </div>
        <div className="block2">
          <h1 id="fh">Unlimited Movies, Videos, and more</h1>
          <h3 id="fh">Watch Anywhere and Anytime.</h3>
          <h2 id="fh">Ready to watch? Click the Get Start button.</h2>
        </div>
        <div className="block3"> 
          <button onClick={()=>Signup()} className="getstartbtn">Get Start now</button>
        </div>
      </div>
    </>
  )
}

export default HTLanding;
