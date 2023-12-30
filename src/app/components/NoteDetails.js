import { useNotesContext } from '../hooks/useNotesContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/notes/${note.id}`, {
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
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default NoteDetails;
