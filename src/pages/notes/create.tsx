import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://protectednotes-api.onrender.com/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      navigate("/notes"); // Skicka tillbaka användaren till listan efter skapandet
    } catch (err) {
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Note</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>


        <input
          aria-label="titleinput"
          placeholder="Title"
          type="text"
          value={title} onChange={(e) => setTitle(e.target.value)}
          required />


        <textarea
          aria-label="textinput"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required />

        <button className="btn-create" style={{ marginTop: '2em' }} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>

      <NavLink to="/notes"><button className="btn-back" style={{ marginTop: '4em' }}><FaChevronLeft /> Back to notes</button></NavLink>
    </div>
  );
};

export default CreateNotePage;
