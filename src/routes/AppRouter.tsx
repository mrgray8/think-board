import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNotePage from "../pages/CreateNotePage";
import EditNotePage from "../pages/EditNotePage";
import HomePage from "../pages/HomePage";
import NoteDetailPage from "../pages/NoteDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/new" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/notes/:id/edit" element={<EditNotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
