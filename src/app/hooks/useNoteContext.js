import { NotesContext } from "../context/NotesContext";
import { useContext } from "react";

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotesContext must be used inside a NotesContextProvider');
  }

  return context;
};


