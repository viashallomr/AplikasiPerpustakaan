import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditPeminjaman = () => {
  const [tgl_pinjam, setTgl_pinjam] = useState("");
  const [tgl_kembali, setTgl_kembali] = useState("");
  const [bukuId, setBukuId] = useState("");
  const [anggotaId, setAnggotaId] = useState("");
  const [statusPinjam, setstatusPinjam] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPeminjamanById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/peminjamans/${id}`);
        setTgl_pinjam(response.data.tgl_pinjam);
        setTgl_kembali(response.data.tgl_kembali);
        setBukuId(response.data.bukuId);
        setAnggotaId(response.data.anggotaId);
        setstatusPinjam(response.data.statusPinjam);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
    getPeminjamanById();
  }, [id]);

  const statusOptions = [
    { value: 'Sedang dipinjam', label: 'Sedang dipinjam' },
    { value: 'Telah dikembalikan', label: 'Telah dikembalikan' },
  ];

  const updatePeminjaman = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/peminjamans/${id}`, {
        tgl_pinjam: tgl_pinjam,
        tgl_kembali: tgl_kembali,
        bukuId: bukuId,
        anggotaId: anggotaId,
        statusPinjam: statusPinjam
      });
      navigate("/peminjamans");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <h1 className='title'>Update Peminjaman</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePeminjaman}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Tanggal Pinjam</label>
                <div className="control">
                  <input
                    type="text"
                    value={tgl_pinjam}
                    onChange={(e) => setTgl_pinjam(e.target.value)}
                    className="input"
                    placeholder='Tanggal Pinjam' />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Kembali</label>
                <div className="control">
                  <input
                    type="text"
                    value={tgl_kembali}
                    onChange={(e) => setTgl_kembali(e.target.value)}
                    className="input"
                    placeholder='Tanggaal Kembali' />
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
                    placeholder='Id Buku' />
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
                    placeholder='Id Anggota' />
                </div>
              </div>
              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={statusPinjam}
                      onChange={(e) => setstatusPinjam(e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type='submit' className="button is-success" style={{ backgroundColor: "#689773"}}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditPeminjaman;
