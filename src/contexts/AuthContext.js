import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signin(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout(){
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
                    const snapshot = await getDoc(doc(db, "DiaFixDoctor", uid));
                    if(snapshot.exists()){
                      navigate('/home')
                    }else{
                      const snapshot = await getDoc(doc(db, "DiaFixPatient", uid));
                      if(snapshot.exists()){
                       
                      }else{
                        const snapshot = await getDoc(doc(db, "DiaFixAdmin", uid));
                        if(snapshot.exists()){
                          
                        }else{
                          console.log('missing docs')
                        }
                      }
                    }
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
