import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

// components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_NOTES', payload: json });
        } else {
          console.error('Error fetching notes:', json.error);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="notes">
        {notes && notes.map(note => (
          <NoteDetails note={note} key={note.id} />
        ))}
      </div>
      <NoteForm />
    </div>
  );
};

export default Home;
