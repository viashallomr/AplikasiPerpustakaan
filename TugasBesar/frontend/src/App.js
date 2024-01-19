import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import User from "./pages/User";
import Buku from "./pages/Buku";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AddAnggota from "./pages/AddAnggota";
import EditAnggota from "./pages/EditAnggota";
import Anggota from "./pages/Anggota";
import Peminjaman from "./pages/Peminjaman";
import AddPeminjaman from "./pages/AddPeminjaman";
import EditPeminjaman from "./pages/EditPeminjaman";


function App() {
  return (
    <div >
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/anggota" element={<Anggota/>} />
      <Route path="/anggota/add" element={<AddAnggota />} />
      <Route path="/anggota/edit/:id" element={<EditAnggota />} />
      <Route path="/users" element={<User />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/bukus" element={<Buku />} />
      <Route path="/bukus/add" element={<AddBook />} />
      <Route path="/bukus/edit/:id" element={<EditBook />} />
      <Route path="/peminjamans" element={<Peminjaman />} />
      <Route path="/peminjamans/add" element={<AddPeminjaman />} />
      <Route path="/peminjamans/edit/:id" element={<EditPeminjaman />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
