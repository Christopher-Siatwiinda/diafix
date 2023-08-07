import { useEffect, useState } from 'react';
import { FaUserMd } from 'react-icons/fa';
import { db } from '../../config/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';

export default function Index() {
    const currentUser = localStorage.getItem("user")
    const [loggedUser, setLoggedUser] = useState(null);
    const [docUid, setDocUid] = useState();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    console.log(email)

    const updateEmail = async (id, email) => {
        console.log(id)
        const userRef = doc(db, "DiaFixDoctor", 'TSzSw1pzZ8MJZTHPRV5IDx09qBm1');
        const newField = {Email: "test@gamil.com"};
        await updateDoc(userRef, newField).then(userDoc => {
            console.log("Value has been updated");
        }).catch(error => {
            console.log(error);
        });
    }

    const updatePhone = async (id, phone) =>{
        console.log(id)
        const userDoc = doc(db, "DiaFixDoctor", 'TSzSw1pzZ8MJZTHPRV5IDx09qBm1');
        const newField = {Phone: phone};
        await updateDoc(userDoc, newField);
    }

    const updatePassword = async (id, password) => {
        console.log(id)
        const userDoc = doc(db, "DiaFixDoctor", 'TSzSw1pzZ8MJZTHPRV5IDx09qBm1');
        const newField = {Email: email};
        await updateDoc(userDoc, newField);
    }
    
    
    useEffect(() => {
        const currentDoc = async () => {
            if(currentUser){
                const uid = currentUser;
                setDocUid(currentUser);
                const snapshot = await getDoc(doc(db, "DiaFixDoctor", uid));
                if(snapshot.exists()){
                    setLoggedUser(snapshot.data());
                    console.log(loggedUser);
                }else{
                    console.log("missing docs")
                }
            }else{
                console.log("User not logged in");
                setLoggedUser(null);
            }
        }

        currentDoc();
    }, []);
    
  return (
    <div className='row ms-1'>
        <div style={{background: '#ff03d9', color: '#fff', marginRight: "0px"}} className='shadow rounded col-lg-4 col-md-4 col-sm-auto mb-3'>
            <div className='text-center pt-3 pb-3 shadow rounded-bottom' style={{color: "#fff"}}>
                <FaUserMd style={{width: 190+'px', height: 190+'px'}}/>
            </div>
            {loggedUser && (
                <div>
                    <p className='fs-6 mt-3'>Name: <strong  style={{fontWeight: 900}} className='fs-5'>{loggedUser.fullName}</strong></p>
                    <p className='fs-6'>NRC: <strong style={{fontWeight: 900}} className='fs-5'>{loggedUser.NRC}</strong></p>
                    <p className='fs-6'>Email: <strong style={{fontWeight: 900}} className='fs-5'>{loggedUser.Email}</strong></p>
                    <p className='fs-6'>Phone: <strong style={{fontWeight: 900}} className='fs-5'>{loggedUser.Phone}</strong></p>
                    <p className='fs-6'>Alt Phone: <strong style={{fontWeight: 900}} className='fs-5'>N/a</strong></p>
                </div>
            )
            }
            
        </div>
        <div className='col-lg-8 col-md-4 col-sm-auto'>
            <h4>Personal Details</h4>
        <form className='mt-2 mb-5'>
            <h6>Contact details</h6>
                <div className="mb-3">
                    <label for="password" className="form-label">Email</label>
                    <input onChange={(event) => {setEmail(event.target.value)}} type="text" class="form-control" id="password" name="password"/>
                </div>
                <button
                style={{
                    borderStyle: 'none', 
                    marginTop: 10+"px", 
                    paddingTop: 5+"px",
                    paddingRight: 35+'px',
                    paddingLeft: 35+'px',
                    paddingBottom: 5+'px'
                }}
               onClick={() => {updateEmail(docUid, email)}} className="text-white">Update</button>
            <hr/>
                <div className="mb-3">
                    <label for="Conf_password" className="form-label">Phone</label>
                    <input onChange={(event) => {setPhone(event.target.value)}} type="text" class="form-control" id="Conf_password" name="Confirm_p"/>
                </div>
                
                <button
                style={{
                    borderStyle: 'none', 
                    marginTop: 10+"px", 
                    paddingTop: 5+"px",
                    paddingRight: 35+'px',
                    paddingLeft: 35+'px',
                    paddingBottom: 5+'px'
                }}
            onClick={() => {updatePhone(docUid, phone)}} className="text-white">Update</button>
        </form>

        <form className='mt-2'>
                <h6 className='mb-3'>Password</h6>
                <div className="mb-3">
                    <label for="password" className="form-label">New Password</label>
                    <input type="text" className="form-control" id="password" name="password"/>
                </div>
                <div className="mb-3">
                    <label for="Conf_password" className="form-label">Comfirm Password</label>
                    <input type="text" className="form-control" id="Conf_password" name="Confirm_p"/>
                </div>
                
                <button
                style={{
                    borderStyle: 'none', 
                    marginTop: 10+"px", 
                    paddingTop: 5+"px",
                    paddingRight: 35+'px',
                    paddingLeft: 35+'px',
                    paddingBottom: 5+'px'
                }}
                onClick={() => {updatePassword(docUid, password)}} className="text-white">Save</button>
            </form>
        </div> 
    </div>
  )
}
