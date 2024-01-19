import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBuku = () => {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [kategori, setKategori] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [stok, setStok] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const kategoriOptions = [
    "Fiksi",
    "Non-Fiksi",
    "Sains",
    "Sejarah",
    "Komputer",
    "Matematika",
    "Lainnya",
    // Tambahkan opsi kategori sesuai dengan data yang ada di buku
  ];

  useEffect(() => {
    const getBukuById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bukus/${id}`);
        setJudul(response.data.judul);
        setPenulis(response.data.penulis);
        setPenerbit(response.data.penerbit);
        setKategori(response.data.kategori);
        setTahunTerbit(response.data.tahunTerbit);
        setStok(response.data.stok.toString());
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getBukuById();
  }, [id]);

  const updateBuku = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/bukus/${id}`, {
        judul: judul,
        penulis: penulis,
        penerbit: penerbit,
        kategori: kategori,
        tahunTerbit: tahunTerbit,
        stok: parseInt(stok),
      });
      navigate("/bukus");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title"> Update Buku</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBuku}>
              <p className="has-text-centered">{msg}</p>
              <div className="columns">
                <div className="column is-half">
                  <div className="field">
                    <label className="label">Judul</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        placeholder="Judul"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Penulis</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        placeholder="Penulis"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Tahun Terbit</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={tahunTerbit}
                        onChange={(e) => setTahunTerbit(e.target.value)}
                        placeholder="Tahun Terbit"
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field">
                    <label className="label">Penerbit</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={penerbit}
                        onChange={(e) => setPenerbit(e.target.value)}
                        placeholder="Penerbit"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Kategori</label>
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
                  <div className="field">
                    <label className="label">Stok</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                        placeholder="Stok"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth" style={{ backgroundColor: "#689773"}}
                  >
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

export default FormEditBuku;
