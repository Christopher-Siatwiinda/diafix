import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getDoc, doc } from 'firebase/firestore';

export default function Index({currentUser}) {
    const uid = currentUser.uid;
    const [currentDoc, setCurrentDoc] = useState(null)
  
      async function docInfo () {
        const snapshot = await getDoc(doc(db, "DiaFixDoctor", uid));
        if(snapshot.exists()){
        setCurrentDoc(snapshot.data());
        }else{
        console.log("Missing doc of this doc");
        }
      } 
  
      docInfo();
      
  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-auto">
                <p>Name: {currentDoc && currentDoc.Email}</p>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-auto"></div>
        </div>
    </div>
  )
}
