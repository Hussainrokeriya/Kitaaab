import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBhe1XkAXT4DKbglFqUpTJPI_6o6DU4ItU",
  authDomain: "kitaaab-50eb9.firebaseapp.com",
  projectId: "kitaaab-50eb9",
  storageBucket: "kitaaab-50eb9.firebasestorage.app",
  messagingSenderId: "651376449304",
  appId: "1:651376449304:web:1b1956ad750a35743fb06d"
};

const app = initializeApp(firebaseConfig);
const Firebaseauth = getAuth(app);
const firestore = getFirestore();
const provider = new GoogleAuthProvider(app);


export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(Firebaseauth, user => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [])
    
    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(
        Firebaseauth,
        email,
        password
    );
    
    const singinUserWithEmailAndPass = (email, password) => signInWithEmailAndPassword(
        Firebaseauth, 
        email, 
        password
    );
    
    const SigninWithGoogle = () => signInWithPopup(
        Firebaseauth,
        provider
    ); 
    console.log(user);
    
    const handlecreateAddlisting = async (name, isbn, price, displayname) => {
        if (!user) {
            navigate('/login');
        }
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            displayname,
            userId: user.uid,
            userEmail: user.email,
        })
    };

    const listAllbooks = () => {
        return getDocs(collection(firestore, "books"));
    };

    const getBookbyId = async (id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        return result;
    };

    const placeOrder = async (bookId, qty) => {
        const collectionref = collection(firestore, 'books', bookId, 'orders');
        const result = await addDoc(collectionref, {
            userId: user.uid,
            useremail: user.email,
            qty: Number(qty),
        });
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userId", "==", userId));

        const result = await getDocs(q);
        return result;
    };

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders');
        const result = await getDocs(collectionRef);
        return result;
    }

    const isLoggedin = user ? true : false;

    return (
        <FirebaseContext.Provider 
        value={{ 
            signupUserWithEmailAndPassword, 
            singinUserWithEmailAndPass, 
            SigninWithGoogle, 
            isLoggedin, 
            handlecreateAddlisting,
            listAllbooks,
            getBookbyId,
            placeOrder,
            fetchMyBooks,
            user,
            getOrders
        }}>
            {props.children}
        </FirebaseContext.Provider>
        );
};