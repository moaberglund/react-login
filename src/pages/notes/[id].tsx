
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetailPage = () => {
  const { id } = useParams<{ id: string }>();  // Hämtar id från URL
  const [note, setNote] = useState<any | null>(null);  // Du kan använda en riktig typ här för "note"

  useEffect(() => {
    if (id) {
      fetchNote(id);
    }
  }, [id]);

  const fetchNote = async (id: string) => {
    const resp = await fetch(`https://protectednotes-api.onrender.com/note/${id}`);
    const data = await resp.json();
    setNote(data);
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteDetailPage;
