import { EyeClosedIcon, EyeIcon, PenSquare, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import apiBaseUrl  from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note}) => {
    const handleDelete = async (e,id) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                const response = await apiBaseUrl.delete(`/notes/${id}`);
                if (response.status === 200) {
                    toast.success('Note deleted successfully');
                    window.location.reload();
                } else {
                    toast.error('Failed to delete note');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div key={note._id} className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-emerald-500">
            <div className="card-body">
                <Link to={`/notes/${note._id}`}><h2 className="card-title">{note.title}</h2></Link>
                <p>{note.content.slice(0, 100)} ...</p>
                <div className="card-actions justify-between my-4">
                    <span className="text-sm text-gray-500 ">Created at: {formatDate(new Date(note.createdAt))}</span>
                    <div className="flex items-center gap-1 align-right">
                        <PenSquare className="size-4 text-emerald-500" />
                        <button className="btn btn-xs btn-ghost" onClick={(e) => {handleDelete(e,note._id)}}>
                            <Trash2Icon className="size-4 text-red-500" />
                        </button>
                        <Link to={`/notes/${note._id}`}><EyeIcon className="size-4 text-gray-500" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard