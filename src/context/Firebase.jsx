import { createContext,useContext, useEffect,useState } from 'react';
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth"; //authenticaion
import {
    getFirestore,
    collection,
    addDoc,
    getDocs, 
    doc,
    getDoc, 
    query,
    where
} from "firebase/firestore"; //firestore
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage"

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

//initialize the app    
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

//create the context
const FirebaseContext = createContext(null);

//create the custom hook
export const useFirebase = () => useContext(FirebaseContext);

//create the provider
export const FirebaseProvider = (props)=>{

    const [user,setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            console.log("user",user.uid);
            if(user) setUser(user);
            else setUser(null);
        });
    },[]);

    const signupUserWithEmailAndPassword = (email,password) =>{
        return createUserWithEmailAndPassword(firebaseAuth,email,password);
    }

    const siginUserWithEmailAndPassword = (email,password) =>{
        return signInWithEmailAndPassword(firebaseAuth,email,password);
    }
    
    const signinWithGoogle = ()=>{
        return signInWithPopup(firebaseAuth,googleProvider);
    }

    const handleCreateNewListing = async (name,isbn,author,price,edition,genre,cover)=>{

        /* Procedure:
          get the data from the form 
          upload the coverpic to the storage with currenttime and bookname
          get the URL of the pic
          create the book object with the data from the form and the image URL and the user data
          add the book object to the firestore
         */

        //we have to add the coverpicture to the storage ( bucket ) and pass the url here 
        const imageRef = ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef,cover);

        return await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            author,
            price,
            edition,
            genre,
            imageURL : uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        });

    }

    const listAllBooks = ()=>{
        return getDocs(collection(firestore,"books"));
    };

    const getBookById = async(id)=>{
        const docRef = doc(firestore,"books",id);
        return  await getDoc(docRef);
    }

    const getImageURL = (path)=>{
        return getDownloadURL(ref(storage,path));
    }

    const placeOrder = async(bookId)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await  addDoc(collectionRef,{
            username: user.displayName,
            userID : user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        return result;
    };
    
    const fetchOrders = async (userId)=>{
        
        const collectionRef = collection(firestore,"books");
        const q = query(collectionRef,where("userID","==",userId));

        const result = await getDocs(q);
        return result;
    }

    const getOrders = async (bookId)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await getDocs(collectionRef);
        return result;
    }


    const signOutUser = ()=>{
        signOut(firebaseAuth).then(() => {
            console.log("signed out successfully");
          }).catch((error) => {
            console.log("error signing out",error);
          });
    }

    const isLoggedIn = user ? true:false;

    return (
        <FirebaseContext.Provider value = {{signupUserWithEmailAndPassword,
        signinWithGoogle,
        siginUserWithEmailAndPassword,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchOrders,
        getOrders,
        user,
        signOutUser,
        isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    );
};