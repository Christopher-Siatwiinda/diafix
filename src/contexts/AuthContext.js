import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signin(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        localStorage.removeItem("user")
        return signOut(auth)
    }

    function resetPassword(email){
      return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => { 
         onAuthStateChanged(auth, (user) => {
            async function testLogin(){
                if(user){
                    const uid = user.uid;
                    localStorage.setItem("user" , uid);
                  }else{
                    console.log("User not logged in");
                  }
            }

            testLogin()
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        signin,
        login,
        logout,
        resetPassword
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
