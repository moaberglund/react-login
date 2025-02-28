import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Text:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNotePage;
