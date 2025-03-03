import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ErrorsData from "../../interfaces/ErrorsData";

const EditNotePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", text: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsData>({});

  // Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Please enter a title.').min(3, "The title must be at least 3 character."),
    text: Yup.string().required("Please enter a text.").min(10, "A good text should be a least 10 characters long, let's try again.").max(200, "A description longer than 200 characters is a bit much, don't you think? Let's shorten it a bit.")
  });

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
    setLoading(true);
    setErrors({});

    const token = localStorage.getItem("token");

    try {

      // Validate
      await validationSchema.validate(note, { abortEarly: false });

      // Send data to the API
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

      if (err instanceof Yup.ValidationError) {
        const validationErrors: ErrorsData = {};

        err.inner.forEach(error => {
          const prop = error.path as keyof ErrorsData;
          validationErrors[prop] = error.message;
        });

        setErrors(validationErrors);
        return;
      }
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

        <input type="text" name="title" value={note.title} onChange={handleChange} required />
        {errors.title && <span className="error-message">{errors.title}</span>}

        <textarea name="text" value={note.text} onChange={handleChange} required />
        {errors.text && <span className="error-message">{errors.text}</span>}

        <button className="btn-create" style={{ marginTop: '2em' }} type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>

      <button onClick={() => navigate(`/notes/${id}`)}>Cancel</button>
    </div>
  );
};

export default EditNotePage;
