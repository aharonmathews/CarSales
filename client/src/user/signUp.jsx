import { useState, useEffect } from 'react';
import bg2 from "../assets/login2.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
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
        setLoading(false);
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
      navigate('/'); // Redirect to home if user exists
    } else {
      await setDoc(userDoc, {
        userID: user.email,
        isProfileCompleted: 'no',
      });
      navigate('/'); // Redirect after creating user document
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
        isProfileCompleted: 'no',
      });

      navigate('/profile'); // Redirect to profile page on successful sign-up
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
      setLoading(false); // Ensure loading is reset on error
      console.error("Login error:", error);
    }
  };

  return (
    <div>
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
                <div className='mt-3'>
                  Already have an account?  
                  <a className='text-blue-500 mx-1 hover:border-b-2 hover:text-blue-700 hover:cursor-pointer' onClick={() => setReg("logIn")}>
                    Log in to your account!
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='hidden md:block'>
        <img className='h-screen w-screen object-cover' src={bg2} alt="background" />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default SignIn;