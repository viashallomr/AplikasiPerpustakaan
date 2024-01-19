import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddPeminjaman = () => {
    const [tgl_pinjam, setTgl_pinjam] = useState("");
    const [tgl_kembali, setTgl_kembali] = useState("");
    const [bukuId, setBukuId] = useState("");
    const [anggotaId, setAnggotaId] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const savePeminjaman = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/peminjamans', {
                tgl_pinjam: tgl_pinjam,
                tgl_kembali: tgl_kembali,
                bukuId: bukuId,
                anggotaId: anggotaId,
            });
            navigate("/peminjamans");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
       <h1 className='title' style={{color : "white"}} >Peminjaman Baru</h1>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={savePeminjaman}>
                    <p className="has-text-centered">{msg}</p>
                <div className="field">
                        <label className="label">Tanggal Pinjam</label>
                        <div className="control">
                            <input 
                            type="date" 
                            value={tgl_pinjam}
                            onChange={(e) => setTgl_pinjam(e.target.value)}
                            className="input" 
                            placeholder='Tanggal Pinjam'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tanggal Kembali</label>
                        <div className="control">
                            <input 
                            type="date" 
                            value={tgl_kembali}
                            onChange={(e) => setTgl_kembali(e.target.value)}
                            className="input" 
                            placeholder='Tanggal Kembali'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Id Buku</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={bukuId}
                            onChange={(e) => setBukuId(e.target.value)}
                            placeholder='Id Buku'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Id Anggota</label>
                        <div className="control">
                            <input 
                            type="text" 
                            value={anggotaId}
                            onChange={(e) => setAnggotaId(e.target.value)}
                            className="input" 
                            placeholder='Id Anggota'/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type='submit' className="button is-success"style={{ backgroundColor: "#689773"}}>Save</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddPeminjaman;