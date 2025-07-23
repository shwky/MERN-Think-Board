import {use, useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router";
import apiBaseUrl from "../lib/axios";
import { ArrowLeftCircleIcon, NotebookIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await apiBaseUrl.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Failed to load note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  const handleDelete = async (e,id) => {
      e.preventDefault();
      if (window.confirm("Are you sure you want to delete this note?")) {
          try {
              const response = await apiBaseUrl.delete(`/notes/${id}`);
              if (response.status === 200) {
                  toast.success('Note deleted successfully');
                  navigate("/");
              } else {
                  toast.error('Failed to delete note');
              }
          } catch (error) {
              console.error(error);
          }
      }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      toast.error("Title and content are required");
      return;
    } 
    setSaving(true);
    try {
      const response = await apiBaseUrl.put(`/notes/${id}`, note);
      toast.success('Note Updated successfully');
      //navigate("/");
    } catch (error) {
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  }

  if(loading) {
    return <p className="text-center text-emerald-700 py-10"><span className="loading loading-spinner text-success loading-xl"></span> Loading note...</p>;
  }else{
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="btn btn-success">
                <ArrowLeftCircleIcon className="size-5" />
                <span className="ml-2">Back To Notes</span>
            </Link>
          </div>
          <div className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-emerald-500 my-4">
          <div className="card-body">
              <div className="card-title justify-between">
                <h2><NotebookIcon className="float-left"/>Note: {note.title} </h2>
                <button type="=submit" className="btn btn-error"  onClick={(e) => {handleDelete(e,note._id)}}>
                    <Trash2Icon /> Delete Note
                </button>
              </div> 
              <form className="space-y-4">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text" name="title" className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  name="content" className="textarea textarea-bordered w-full"
                  value={note.content}  
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-success" disabled={loading} onClick={handleSave}>
                  {saving ? <><span className="loading loading-spinner"></span><span> Saving</span></> : "Save Note"}
                </button>  
              </div>
            </form> 
          </div>
        </div>
        </div>
      </div>
    )
  }
}
export default NoteDetails