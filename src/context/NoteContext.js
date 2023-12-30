'use client'
import { createContext, useReducer } from 'react';

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        notes: action.payload,
      };
    case 'CREATE_NOTE':
      return {
        notes: [...state.notes,action.payload],
      };
      case 'UPDATE_NOTE':
        return {
          notes: state.notes.map((n)=>{
          if (n.id === action.payload.id){
            return {...n, title:action.payload.newNote.title,description:action.payload.newNote.description,note:action.payload.newNote.note}
          }
          return n;
        })
      }
    case 'DELETE_NOTE':
      return {
        notes: state.notes.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
  });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
