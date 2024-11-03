import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged} from "firebase/auth";
import { doc ,CollectionReference, getDoc } from "firebase/firestore";
import { auth } from "../../config/firebase"
import { db } from "../../config/firebase";
import { setDoc, collection} from "firebase/firestore";

export const logout= createAsyncThunk(
    "auth/logout",
    async ()=>{
        try {
            await signOut(auth)
            return true
        } catch (error) {
            console.log(error);
            
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (user) => {

        try {
            console.log("user",user);
            
         const userCredential =   await signInWithEmailAndPassword(auth, user.email, user.password)
         console.log("userCredential in login",userCredential.user.uid);
         
         const docSnap = await getDoc(doc(db, "users",userCredential.user.uid))
         const dbUser = docSnap?.data()
         console.log("dbUser",dbUser);
         
         return dbUser


        } catch (error) {
             console.log("error",error);
             
        }
        
    }
)

 export const signup = createAsyncThunk(
    "auth/signup",
    async (user)=>{
        try {
           const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
           let saveUserTodb= {
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            uid: userCredential.user.uid
           }
            console.log("signup in slice", user);
            await setDoc(doc(db, "users",userCredential.user.uid), saveUserTodb)
            return saveUserTodb
            
        } catch (error) {
            console.log("error", error);
            
        }
        return user
    }
 )

const initialState = {
    user: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(signup.fulfilled, (state, action)=>{
            console.log("action", action.payload);
            state.user = action.payload
            
        })
        builder.addCase(login.fulfilled, (state,action)=>{
            console.log("action in login", action.payload);
            state.user = action.payload
        })
        builder.addCase(logout.fulfilled, (state,action)=>{
            console.log("action in login", action.payload);
            state.user = null
        })
    }
})
export const {setUser} = authSlice.actions;
export default authSlice.reducer