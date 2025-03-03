import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { NoteData } from "../../interfaces/NoteData";
import ErrorsData from "../../interfaces/ErrorsData";
import * as Yup from "yup";

const CreateNotePage = () => {

  const [noteData, setNoteData] = useState<NoteData>({
    _id: "",
    title: "",
    text: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Error State
  const [errors, setErrors] = useState<ErrorsData>({});

  // Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Please enter a title.').min(3, "The title must be at least 3 character."),
    text: Yup.string().required("Please enter a text.").min(10, "A good text should be a least 10 characters long, let's try again.").max(200, "A description longer than 200 characters is a bit much, don't you think? Let's shorten it a bit.")
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {

      // Validate
      await validationSchema.validate(noteData, { abortEarly: false });

      // Send data to the API
      const response = await fetch("https://protectednotes-api.onrender.com/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      setErrors({});
      setNoteData({
        _id: '',
        title: '',
        text: ''
      });

      navigate("/notes"); // Skicka tillbaka användaren till listan efter skapandet

    } catch (errors) {
      const validationErrors: ErrorsData = {};

      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach(error => {
          const prop = error.path as keyof ErrorsData;

          validationErrors[prop] = error.message;
        })
        setErrors(validationErrors);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="titleinput"
          placeholder="Title"
          type="text"
          value={noteData.title} 
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          required />
        {errors.title && <span className="error-message">{errors.title}</span>}


        <textarea
          aria-label="textinput"
          placeholder="Write your note here..."
          value={noteData.text}
          onChange={(e) => setNoteData({ ...noteData, text: e.target.value })}
          required />
        {errors.text && <span className="error-message">{errors.text}</span>}

        <button className="btn-create" style={{ marginTop: '2em' }} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>

      <NavLink to="/notes"><button className="btn-back" style={{ marginTop: '4em' }}><FaChevronLeft /> Back to notes</button></NavLink>
    </div>
  );
};

export default CreateNotePage;
