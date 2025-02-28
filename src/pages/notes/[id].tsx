
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const NoteDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [note, setNote] = useState<any | null>(null);  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchNote(id);
    }
  }, [id]);

  const fetchNote = async (id: string) => {

    try {

        setLoading(true);

        const resp = await fetch(`https://protectednotes-api.onrender.com/note/${id}`);

        if (!resp.ok) {
            throw Error;
        } else {
            const data = await resp.json();
            setNote(data);
        }

    } catch (err) {
        console.error('Error fetching notes:', err);
    } finally {
        setLoading(false);
    }
}

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.text}</p>
        <NavLink to="/notes">Back to notes</NavLink>
    </div>
  );
};

export default NoteDetailPage;
