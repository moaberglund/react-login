import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNotePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", text: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error("Failed to fetch note");
      }

      const data = await resp.json();
      setNote(data);
    } catch (err) {
      console.error("Error fetching note:", err);
      setError("Failed to fetch note.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const resp = await fetch(`https://protectednotes-api.onrender.com/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (!resp.ok) {
        throw new Error("Failed to update note");
      }

      navigate(`/notes/${id}`); 
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={note.title} onChange={handleChange} required />
        </label>
        <label>
          Text:
          <textarea name="text" value={note.text} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={() => navigate(`/notes/${id}`)}>Cancel</button>
    </div>
  );
};

export default EditNotePage;
