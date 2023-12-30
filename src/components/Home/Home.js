'use client'
import { useEffect, useState } from "react";
import { useNotesContext } from "@/hooks/useNoteContext";

// components
import NoteDetails from "../NoteDetails";
import NoteForm from "../NoteForm";

const Home = () => {
  const { notes, dispatch } = useNotesContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [mode, setMode] = useState('create')
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notes/fetchNotes');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_NOTES', payload: json.data });
        } else {
          console.error('Error fetching notes:', json.error);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);


  console.log(notes)

  return (
    <div className="home">
      <div className="notes">
        {notes && notes.map(note => (
          <NoteDetails 
          note={note} 
          key={note.id}
          setMode={setMode}
          setTitle={setTitle}
          setDescription={setDescription}
          setNote={setNote}
          setId={setId}
          />
        ))}
      </div>
      <NoteForm
      title={title}
      description={description}
      note={note}
      mode={mode}
      setTitle={setTitle}
      setDescription={setDescription}
      setNote={setNote}
      setMode={setMode}
      id={id}
      />
    </div>
  );
};

export default Home;
