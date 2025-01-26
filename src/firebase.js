
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
signOut} from "firebase/auth";
import { addDoc, 
    getFirestore ,
    collection} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCty_fb2UYznlaiT6iGisPLx2qNIwLkqAg",
  authDomain: "netflix-clone-a29c8.firebaseapp.com",
  projectId: "netflix-clone-a29c8",
  storageBucket: "netflix-clone-a29c8.firebasestorage.app",
  messagingSenderId: "1046623198846",
  appId: "1:1046623198846:web:402fc5a6ad67a17e1e422f"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
  try{
    const res=await createUserWithEmailAndPassword(auth,email,password); 
    const user=res.user;
    await addDoc(collection(db,'users'),
    {
      uid:user.uid,
      name,
      authProvider:"local",
      email,
    });        
  }
  catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login=async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
        
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout=async()=>{
    
         signOut(auth);
 
}
export {auth,db,signup,login,logout};