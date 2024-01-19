import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddBuku = () => {
    const [judul, setJudul] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [kategori, setKategori] = useState("");
    const [tahunTerbit, settahunTerbit] = useState("");
    const [stok, setStok] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const kategoriOptions = ["Fiksi", "Non-Fiksi", "Sains", "Sejarah", "Komputer", "Matematika", "Lainnya"];

    const saveBuku = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/bukus', {
                judul: judul,
                penulis: penulis,
                penerbit: penerbit,
                kategori: kategori,
                tahunTerbit: tahunTerbit,
                stok: stok
            });
            navigate("/bukus");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
       <h1 className='title' style={{color : "white"}} >Buku Baru</h1>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveBuku}>
                    <p className="has-text-centered">{msg}</p>
                <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input 
                            type="text" 
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            className="input" 
                            placeholder='Judul'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Penulis</label>
                        <div className="control">
                            <input 
                            type="text" 
                            value={penulis}
                            onChange={(e) => setPenulis(e.target.value)}
                            className="input" 
                            placeholder='Penulis'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Penerbit</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={penerbit}
                            onChange={(e) => setPenerbit(e.target.value)}
                            placeholder='Penerbit'/>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                <div className="field-label is-normal ">
                  <label className="label">Kategori</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value)}
                        >
                          <option value="" disabled>
                            Pilih Kategori
                          </option>
                          {kategoriOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    <div className="field">
                        <label className="label">Tahun Terbit</label>
                        <div className="control">
                            <input 
                            type="text"
                            value={tahunTerbit}
                            onChange={(e) => settahunTerbit(e.target.value)} 
                            className="input" 
                            placeholder='Email'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Stok</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={stok}
                            onChange={(e) => setStok(e.target.value)}
                            placeholder='Email'/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type='submit' className="button is-success" style={{ backgroundColor: "#689773"}}>Save</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddBuku