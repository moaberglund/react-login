import { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { FaTrash, FaChevronLeft, FaPen } from "react-icons/fa6";

const NoteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {

    const token = localStorage.getItem('token');

    if (!id) return;

    try {
      const resp = await fetch(`https://protectednotes-api.onrender.com/note/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!resp.ok) {
        throw new Error('Failed to delete note');
      }

      navigate('/notes');

    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>No note found</p>;


  return (
    <div>
      <div style={{ marginTop: '2em', marginBottom: '2em' }} className='note'>
        <h1>{note.title}</h1>
        <p>{note.text}</p>

        <div style={{ display: 'flex', gap: '5em', marginTop: '2em' }}>
          <button onClick={() => navigate(`/notes/${id}/edit`)}> <FaPen /> </button>
          <button onClick={handleDelete}><FaTrash /></button>
        </div>
      </div>

      <NavLink to="/notes"><button className='btn-back'><FaChevronLeft /> Back to notes</button></NavLink>

    </div>
  );
};

export default NoteDetailPage;
