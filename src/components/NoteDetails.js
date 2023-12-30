import { useNotesContext } from '@/hooks/useNoteContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const NoteDetails = ({ note, setTitle, setDescription,setNote, setId,setMode }) => {
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deleteNote/${note.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_NOTE', payload: note.id });
      } else {
        const json = await response.json();
        console.error('Error deleting note:', json.error);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p>
        <strong>Description: </strong>
        {note.description}
      </p>
      <p>
        <strong>Note: </strong>
        {note.note}
      </p>
      <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
      <button className="material-symbols-outlined" onClick={handleClick}>
        delete
      </button>
      <button className="material-symbols-outlined" onClick={()=>{

        setTitle(note.title)
        setDescription(note.description)
        setNote(note.note)
        setId(note.id)
        setMode('Update')
      }}>
        update
      </button>
    </div>
  );
};

export default NoteDetails;
