import { useNotesContext } from '@/hooks/useNoteContext';
import { useState } from 'react';

const NoteForm = ({title,setTitle,description,setDescription,note,setNote,mode,id,setMode}) => {
  const { dispatch } = useNotesContext(); // Update to the correct hook for managing notes

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = { title, description, note };


    try {
      const response = await fetch(mode==='create'? 'http://localhost:5000/api/notes/addNote':`http://localhost:5000/api/notes/updateNote/${id}`,
       {
        method: mode==='create'? 'POST':'PUT',
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setEmptyFields(errorData.emptyFields);
      } else {
        const jsonData = await response.json();
        setEmptyFields([]);
        setError(null);
        setTitle('');
        setDescription('');
        setNote('');
        console.log(mode)
        if(mode==='create')
        dispatch({ type: 'CREATE_NOTE', payload: jsonData.data });
      else if (mode === 'Update')
      dispatch({ type: 'UPDATE_NOTE', payload:{
    newNote: { title, description, note },
    id:id
    } });

    setMode('create')
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
      setError('An unexpected error occurred.');
    }

}

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Note</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Note:</label>
      <textarea
        onChange={(e) => setNote(e.target.value)}
        value={note}
        className={emptyFields.includes('note') ? 'error' : ''}
      />

      <button>{mode} Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NoteForm;
