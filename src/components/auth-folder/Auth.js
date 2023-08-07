import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from "react";


export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isDoctor = true;
    const isPatient = true;
    const isAdmin = true; 

    const login = async(e) => {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          if(userCredential){
            const user = userCredential.user.uid;
            localStorage.setItem("user" , user)
          }
          
          //navigate("/home")
          
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
      });
    };

    const logout = async() => {
      try{
        await signOut(auth);
      }catch(err){
        console.error(err)
      }
    };



  return (
    <div>
        <input placeholder="Email..." onChange={(event) => setEmail(event.target.value)}/>
        <input placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={login}> Sign In </button>
        <button onClick={logout}> logout </button>
    </div>
  )
}
