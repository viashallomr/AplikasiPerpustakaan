import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddAnggota = () => {
  const [nama, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveAnggota = async (e) => {
    e.preventDefault();
    try {
      // Sesuaikan URL endpoint dengan backend Anda
      await axios.post('http://localhost:5000/anggotas', {
        nama,
        alamat,
        email,
      });
      navigate("/anggota");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title" style={{color : "white"}}>Anggota Baru</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <form onSubmit={saveAnggota}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nama}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Alamat</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success is-fullwidth"style={{ backgroundColor: "#689773"}} >Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddAnggota;
