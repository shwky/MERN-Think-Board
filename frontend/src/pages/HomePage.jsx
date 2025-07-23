import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import apiBaseUrl from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"

const HomePage = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await apiBaseUrl.get('/notes/');
                setNotes(response.data);
            } catch (error) {
                toast.error('Failed to load notes');
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    },[])

    return (
    <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-6xl p-4">
            {loading && <p className="text-center text-emerald-700 py-10"><span className="loading loading-spinner text-success loading-xl"></span> Loading notes...</p>}
            {notes.length > 0 && !loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} />
                    ))}
                </div>
            )}
        </div>
    </div>
  )

}
export default HomePage