
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,User} from "firebase/auth";
import { useContext,createContext, useState,useEffect, FC,PropsWithChildren} from 'react'

import {app} from '../lib/firebaseConfig'



interface IAuthContext{
    currentUser:User|null;
    setCurrentUser: (user: User | null) => void;
    logIn:()=>Promise<any>;
    logOut:()=>Promise<void>;

}

const AuthContext=createContext<IAuthContext|undefined>(undefined)

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const [currentUser,setCurrentUser]=useState<User|null>(null)
    const [loading,setLoading]=useState<boolean>(true)

    const provider = new GoogleAuthProvider();
    const auth=getAuth(app)

    console.log(app)

    // function signUp(email,password){
    //     // return createUserWithEmailAndPassword(auth,email,password)
    // }
    async function logIn(){
        return signInWithPopup(auth,provider)
     
    }
   async function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
       const unsub=onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user)
          } else {
            setCurrentUser(null)
         
          }
          setLoading(false)
        })
        return unsub
      }, [])

    
    
    

    const value:IAuthContext={
        currentUser,
        setCurrentUser,
        logIn,
        logOut
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading&&children}
    </AuthContext.Provider>
  )
}
export {useAuth,AuthProvider}

