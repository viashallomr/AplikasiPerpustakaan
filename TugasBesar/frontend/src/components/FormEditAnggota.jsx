import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const FormEditAnggota = () => {
  const [nama, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAnggotaById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/anggotas/${id}`);
        setName(response.data.nama);
        setAlamat(response.data.alamat);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAnggotaById();
  }, [id]);

  const updateAnggota = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/anggotas/${id}`, {
        nama: nama,
        alamat: alamat,
        email: email,
      });
     
      navigate("/anggota");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Update Anggota</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateAnggota}>
              <p className="has-text-centered">{msg}</p>
              <div className="columns">
                <div className="column is-half">
                  <div className="field">
                    <label className="label">Name</label>
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
                </div>
                <div className="column is-half">
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
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <button type="submit" className="button is-success is-fullwidth" style={{ backgroundColor: "#689773"}}>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditAnggota;
