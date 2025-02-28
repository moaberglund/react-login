import { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { FaTrash, FaChevronLeft } from "react-icons/fa6";

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
      <div className='note'>
        <h1>{note.title}</h1>
        <p>{note.text}</p>

        <div onClick={handleDelete}><FaTrash /></div>
      </div>

      <NavLink to="/notes"><FaChevronLeft /> Back to notes</NavLink>

    </div>
  );
};

export default NoteDetailPage;
