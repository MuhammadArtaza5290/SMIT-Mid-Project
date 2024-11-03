import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { addDoc, collection,doc, getDocs,deleteDoc,updateDoc, query,where,orderBy, limit} from "firebase/firestore";
import { db } from '../../config/firebase'

// for add data in firestore
export const createNote = createAsyncThunk(
    'note/createNote',
    async (noteData) => {
        try {
            console.log('Creating notein slice', noteData);
            
            const collectionRef = collection(db, "notes");
            const response = await addDoc(collectionRef, noteData);
            // updatedPost = { ...updatedPost, id: response.id };
            // postData.setLoading(false)
            // return updatedPost;
            return {...noteData, id: response.id}
        } catch (error) {
            console.error('Error adding document: ', error)
        }
        // return noteData
    }
)

// for getting data from firestore
// noteSlice.js
export const getNotes = createAsyncThunk(
    'note/getNotes',
    async () => {
      try {
        const collectionRef = collection(db, "notes");
        const queryRef = query(collectionRef)
        const docRes = await getDocs(queryRef);
        let data = [];
        
        // Collect data from Firebase
        docRes.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched data from Firebase:", data); // Check if data is fetched
        return data;  // Return the fetched data
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }
);
// delete data from firestore
export const deleteNote = createAsyncThunk(
    'note/deleteNote',
    async(id)=>{
       try {
        const docRef = doc(db, "notes", id)
        await deleteDoc(docRef);
        return id
       } catch (error) {
        console.log("Error", error);
        
       }
      
    }
  );
  // update data in firestore
  export const updateNote = createAsyncThunk(
    "note/updateNote",
    async(noteData)=>{
      try {
        const docRef = doc(db, "notes", noteData.id);
        await updateDoc(docRef, noteData);
        return noteData
       } catch (error) {
        console.log("Error", error);
        
       }
    }
  )
  


const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        updateNote: null,
    },
    reducers: {
         updateDocID: (state, action) => {
            let note = state.notes.filter((note)=> note.id === action.payload)
            state.updateNote = note[0]
         }
    },
   extraReducers: (builder)=>{
    builder.addCase(createNote.fulfilled, (state, action) => {
        state.notes =[action.payload, ...state.notes];
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        console.log("builder", action.payload );
        
      });
      builder.addCase(deleteNote.fulfilled, (state, action)=>{
        state.notes = state.notes.filter((note)=>note.id !== action.payload)
      });
      builder.addCase(updateNote.fulfilled, (state, action)=>{
        state.notes = state.notes.map((noteData)=>{
            if(noteData.id === action.payload.id){
                return action.payload
            }
            return noteData
        })
        state.updateNote = null
      })
   }

})

export const { updateDocID } = noteSlice.actions;
export default noteSlice.reducer


//where("title", "!=", "note"),orderBy("title") , limit(5)