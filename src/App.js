import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import Protected from './components/Protected'
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import NoteBook from "./pages/NoteBook";
import Note from "./pages/Note";
import AddNote from "./pages/AddNote";

function App() {
  return (
    <div className="w-full h-screen">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/notes' element={<Protected><NoteBook /></Protected>} />
          <Route path='/notes/:noteId' element={<Protected><Note /></Protected>} />
          <Route path='/notes/add' element={<Protected><AddNote /></Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
