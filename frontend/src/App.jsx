import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreateNotePage from './pages/CreateNotePage.jsx';
import NoteDetails from './pages/NoteDetails.jsx';
import toast from 'react-hot-toast';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
      </Routes> 
    </div>
  )
}

export default App