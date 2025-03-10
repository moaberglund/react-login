import { useEffect, useState } from "react";
import { NoteData } from "../../interfaces/NoteData";
import { NavLink } from "react-router-dom";

const NotePage = () => {

    // States
    const [notes, setNotes] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        fetchNotes();
    }, [])

    // Functions
    const fetchNotes = async () => {

        try {

            setLoading(true);

            const resp = await fetch("https://protectednotes-api.onrender.com/note");

            if (!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();
                setNotes(data);
            }

        } catch (err) {
            console.error('Error fetching notes:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <h1>Notes</h1>

            {loading && <p>Loading...</p>}

            <div>
                {notes.map((note: NoteData) => (
                    <div key={note._id} className="note">
                        <h2>{note.title}</h2>
                        <p>{note.text}</p>
                        <NavLink to={`/notes/${note._id}`}>
                            <button style={{ marginTop: '2em' }}>To note</button>
                        </NavLink>
                    </div>
                ))}

            </div>


            <NavLink to="/notes/create">
                <button className="btn-create" style={{ marginTop: '2em' }}>Create New Note</button>
            </NavLink>

        </div>
    );
};

export default NotePage;
