import React, { useState, useEffect } from 'react';
import bg2 from "../assets/login2.jpg";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [reg, setReg] = useState("logIn");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Ensure session is not persisted across browser reloads
    setPersistence(auth, browserSessionPersistence);

    // Check for redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          handlePostLogin(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect result error:", error);
      });

    // Check if the user is already signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handlePostLogin(user);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [navigate]);

  const handlePostLogin = async (user) => {
    const db = getFirestore();
    const userDoc = doc(db, 'userInfo', user.email);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (userData.isDealership === 'no') {
        navigate('/'); // Redirect to home page if not a dealership
      } else if (userData.isDealership === 'yes' && userData.isProfileCompleted === 'no') {
        navigate('/profile'); // Redirect to profile page if dealership and profile not completed
      } else {
        navigate('/dealershipDashboard'); // Redirect to dashboard if dealership and profile completed
      }
    } else {
      console.error("User data not found");
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setLoading(false);
      console.error("Google login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      setLoading(true);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setLoading(false);
      console.error("Facebook login error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a document in the userInfo collection with the user email as the document ID
      await setDoc(doc(db, 'userInfo', user.email), {
        userID: user.email,
        isDealership: 'no',
        isProfileCompleted: 'no',
      });

      navigate('/'); // Redirect on successful sign-up
    } catch (error) {
      setLoading(false);
      console.error("Sign-up error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      handlePostLogin(user);
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  return (
    <div className='grid md:grid-cols-2 h-screen md:overflow-clip'>
      <div className='flex flex-row justify-center'>
        {reg === "logIn" ? (
          <div className='flex flex-col h-screen justify-center'>
            <p className='text-5xl font-serif font-semibold my-4'>Welcome back!</p>
            <p className='text-2xl font-serif mb-5'>Log in to your account</p>
            <div>
              <form className='flex flex-col' onSubmit={handleLogin}>
                <p className='font-semibold text-lg ml-2'>Email</p>
                <input 
                  className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='font-semibold text-lg ml-2'>Password</p>
                <input 
                  className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                  placeholder='Enter your password' 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className='border-2 rounded-lg text-white bg-black hover:bg-slate-500 p-4 w-[23.5rem]' type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
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
          <div className='flex flex-col h-screen justify-center'>
            <p className='text-5xl font-serif font-semibold my-4'>Welcome!</p>
            <div> 
              <p className='text-2xl font-serif mb-5'>Create your account</p>
              <div>
                <form className='flex flex-col' onSubmit={handleSignUp}>
                  <p className='font-semibold text-lg ml-2'>Email</p>
                  <input 
                    className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className='font-semibold text-lg ml-2'>Password</p>
                  <input 
                    className='border-2 border-zinc-400 mb-5 w-[23.5rem] p-1 rounded-xl' 
                    placeholder='Enter your password' 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className='border-2 rounded-lg text-white bg-black hover:bg-slate-500 p-4 w-[23.5rem]' type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
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
                  Already have an account?  
                  <a className='text-blue-500 mx-1hover:border-b-2 hover:text-blue-700 hover:cursor-pointer' onClick={() => setReg("logIn")}>
                    Login!
                  </a>
                </div>
              </div>
            </div>
          </div>
        )} 
      </div>
      <img src={bg2} className='min-w-full h-full -mt-56 hidden md:block'/>
    </div>
  );
};

export default SignIn;