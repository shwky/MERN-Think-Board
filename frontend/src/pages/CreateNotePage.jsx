import axios from "axios"
import { ArrowLeftCircleIcon, NotebookIcon } from "lucide-react"
import { useState } from "react"
import apiBaseUrl from "../lib/axios"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"

const CreateNotePage = () => {
  const [title, setTitle] =useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    } 
    setLoading(true);
    try {
      const response = await apiBaseUrl.post('/notes/', {
        title, 
        content 
      });
      toast.success('Note created successfully');
      navigate("/");
    } catch (error) {
      toast.error('Failed to create note');
    } finally {
      setTitle("");
      setContent("");
      setLoading(false);
    }
  }
  

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
            <h2 className="card-title"><NotebookIcon />Create New Note: </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text" name="title" className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content" className="textarea textarea-bordered w-full"
                value={content}  
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Create Note"}
              </button>  
            </div>
          </form> 
        </div>
      </div>
      </div>
    </div>
  )
}
export default CreateNotePage