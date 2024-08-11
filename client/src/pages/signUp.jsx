import React, { useState } from 'react';
import bg from "../assets/loginBG.png";

const SignIn = () => {
  const [reg, setReg] = useState("signUp");
  return (
    <>
    <div className='grid md:grid-cols-2 '>
      <div className='flex flex-row justify-center'>
        {reg === "signUp" ?
          <div className='flex flex-col h-screen justify-center'>
              <p className='text-5xl font-serif font-semibold my-8'>Welcome back!</p>
              <p className='text-2xl font-serif mb-5'>Log in to your account</p>
              <div>
                <form className='flex flex-col'>
                  <p>Email</p>
                  <input className='border-2 border-zinc-400 mb-5' placeholder='Enter your email'/>
                  <p>Password</p>
                  <input className='border-2 border-zinc-400 mb-5' placeholder='Enter your password' type="password"/>
                  <button className='border-2 rounded-lg text-white bg-black hover:bg-slate-500 p-4'>
                    Login
                  </button>
                </form>
                
              </div>
          </div>
          :
          <div>
              Sign In
          </div>
        } 
      </div>

      <img src={bg} className=''/>
    </div>
    </>
  )
}

export default SignIn;