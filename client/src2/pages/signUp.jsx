import React, { useState } from 'react';
import bg2 from "../assets/login2.jpg";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const SignIn = () => {
  const [reg, setReg] = useState("logIn");

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful login
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful login
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <>
      <div className='grid md:grid-cols-2 h-screen md:overflow-clip'>
        <div className='flex flex-row justify-center'>
          {reg === "logIn" ? (
            <div className='flex flex-col h-screen justify-center'>
              <p className='text-5xl font-serif font-semibold my-4'>Welcome back!</p>
              <p className='text-2xl font-serif mb-5'>Log in to your account</p>
              <div>
                <form className='flex flex-col'>
                  <p className='font-semibold text-lg ml-2'>Email</p>
                  <input className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' placeholder='Enter your email'/>
                  <p className='font-semibold text-lg ml-2'>Password</p>
                  <input className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' placeholder='Enter your password' type="password"/>
                  <button className='border-2 rounded-lg text-white bg-black hover:bg-slate-500 p-4 w-[23.5rem]'>
                    Login
                  </button>
                </form>
                <div className='flex justify-evenly mt-3'>
                  <button onClick={handleGoogleLogin} className='border-2 rounded-lg bg-white hover:bg-gray-200 p-4 w-1/3 flex justify-center items-center'>
                    <img src={'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'} alt="Google" className="h-6" />
                  </button>
                  <button onClick={handleFacebookLogin} className='border-2 rounded-lg bg-white hover:bg-gray-200 p-4 w-1/3 flex justify-center items-center'>
                    <img src={'https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000'} alt="Facebook" className="h-6" />
                  </button>
                </div>
                <div className='mt-3'>
                  Don&apos;t have an account?  
                  <a className='text-blue-500 mx-1 hover:border-b-2 hover:text-blue-700 hover:cursor-pointer' onClick={() => setReg("signIn")}>
                    Create your account!
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className='flex flex-col h-screen justify-center'>
                <p className='text-5xl font-serif font-semibold my-4'>Welcome!</p>
                <div> 
                  <p className='text-2xl font-serif mb-5'>Create your account</p>
                  <div>
                    <form className='flex flex-col'>
                      <p className='font-semibold text-lg ml-2'>Email</p>
                      <input 
                        className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                        placeholder='Enter your email'/>
                      <p className='font-semibold text-lg ml-2'>Password</p>
                      <input 
                        className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                        placeholder='Enter your password' 
                        type="password"/>
                      <button className='border-2 rounded-lg text-white bg-black hover:bg-slate-500 p-4 w-[23.5rem]'>
                        Sign Up
                      </button>
                    </form>
                    <div className='flex justify-evenly mt-3'>
                      <button onClick={handleGoogleLogin} className='border-2 rounded-lg bg-white hover:bg-gray-200 p-4 w-1/3 flex justify-center items-center'>
                        <img src={'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'} alt="Google" className="h-6" />
                      </button>
                      <button onClick={handleFacebookLogin} className='border-2 rounded-lg bg-white hover:bg-gray-200 p-4 w-1/3 flex justify-center items-center'>
                        <img src={'https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000'}  alt="Facebook" className="h-6" />
                      </button>
                    </div>
                    <div className='mt-3'>
                      Already have an account?  
                      <a className='text-blue-500 mx-1 hover:border-b-2 hover:text-blue-700 hover:cursor-pointer' onClick={() => setReg("logIn")}>
                        Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} 
        </div>
        <img src={bg2} className='min-w-full h-full -mt-56 hidden md:block'/>
      </div>
    </>
  );
};

export default SignIn;